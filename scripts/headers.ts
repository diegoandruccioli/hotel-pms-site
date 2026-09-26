import { createHash } from "node:crypto";

// Cloudflare Pages `_headers` for the static build. The prerendered HTML carries inline
// scripts (router context, hydration bootstrap), so script-src lists their SHA-256 hashes
// instead of allowing 'unsafe-inline'. Hashes change on every build and are regenerated.

const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;

export const SITE_URL = "https://hotel-pms-site.pages.dev/";

/** CSP hash source for one inline script body. */
export function scriptHash(body: string): string {
  return `'sha256-${createHash("sha256").update(body).digest("base64")}'`;
}

/** Hash sources of every inline script in an HTML document, without duplicates. */
export function inlineScriptHashes(html: string): string[] {
  const hashes = new Set<string>();
  for (const match of html.matchAll(INLINE_SCRIPT)) {
    hashes.add(scriptHash(match[1] ?? ""));
  }
  return [...hashes];
}

export function buildCsp(hashes: string[]): string {
  return [
    "default-src 'self'",
    `script-src ${["'self'", ...hashes].join(" ")}`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Headers other than CSP; the exact values are also what the deploy check expects. */
export const STATIC_HEADERS: Readonly<Record<string, string>> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
};

export const ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable";

/** Contents of the `_headers` file. HTML keeps Cloudflare's default revalidating cache. */
export function buildHeadersFile(hashes: string[]): string {
  const lines = ["/*", `  Content-Security-Policy: ${buildCsp(hashes)}`];
  for (const [name, value] of Object.entries(STATIC_HEADERS)) {
    lines.push(`  ${name}: ${value}`);
  }
  lines.push("/assets/*", `  Cache-Control: ${ASSET_CACHE_CONTROL}`, "");
  return lines.join("\n");
}

/** Problems found in a live response; empty when every expected header is right. */
export function headerProblems(headers: Headers, html: string): string[] {
  const problems: string[] = [];

  for (const [name, expected] of Object.entries(STATIC_HEADERS)) {
    const actual = headers.get(name);
    if (actual !== expected) {
      problems.push(`${name}: expected "${expected}", got ${actual === null ? "nothing" : `"${actual}"`}`);
    }
  }

  const csp = headers.get("Content-Security-Policy");
  if (csp === null) {
    problems.push("Content-Security-Policy: missing");
  } else {
    if (csp.includes("'unsafe-inline'") || csp.includes("'unsafe-eval'")) {
      problems.push("Content-Security-Policy: allows unsafe-inline or unsafe-eval");
    }
    for (const hash of inlineScriptHashes(html)) {
      if (!csp.includes(hash)) {
        problems.push(`Content-Security-Policy: inline script hash ${hash} not allowed`);
      }
    }
    for (const directive of buildCsp([]).split("; ")) {
      if (!directive.startsWith("script-src") && !csp.includes(directive)) {
        problems.push(`Content-Security-Policy: missing "${directive}"`);
      }
    }
  }

  return problems;
}
