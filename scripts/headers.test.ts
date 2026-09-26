import { describe, expect, it } from "vitest";
import { STATIC_HEADERS, buildCsp, buildHeadersFile, headerProblems, inlineScriptHashes, scriptHash } from "./headers.ts";

const HTML = `<html><head><script>window.a = 1;</script><script src="/assets/x.js"></script>
<script type="module">import "/assets/y.js";</script><script>window.a = 1;</script></head></html>`;

function responseHeaders(csp: string, overrides: Record<string, string> = {}): Headers {
  return new Headers({ ...STATIC_HEADERS, "Content-Security-Policy": csp, ...overrides });
}

describe("inlineScriptHashes", () => {
  it("hashes inline scripts once and skips external ones", () => {
    const hashes = inlineScriptHashes(HTML);
    expect(hashes).toEqual([scriptHash("window.a = 1;"), scriptHash('import "/assets/y.js";')]);
  });

  it("finds nothing in a page without inline scripts", () => {
    expect(inlineScriptHashes('<script src="/a.js"></script>')).toEqual([]);
  });
});

describe("buildCsp", () => {
  it("never allows unsafe-inline and lists the hashes in script-src", () => {
    const csp = buildCsp(["'sha256-abc'"]);
    expect(csp).toContain("script-src 'self' 'sha256-abc'");
    expect(csp).not.toContain("unsafe-inline");
    expect(csp).toContain("frame-ancestors 'none'");
  });
});

describe("buildHeadersFile", () => {
  it("applies security headers to every path and immutable caching to assets", () => {
    const file = buildHeadersFile(["'sha256-abc'"]);
    expect(file).toMatch(/^\/\*\n {2}Content-Security-Policy: /);
    expect(file).toContain("  Strict-Transport-Security: max-age=63072000; includeSubDomains");
    expect(file).toContain("/assets/*\n  Cache-Control: public, max-age=31536000, immutable");
  });
});

describe("headerProblems", () => {
  it("accepts a response with every header and a hash for each inline script", () => {
    expect(headerProblems(responseHeaders(buildCsp(inlineScriptHashes(HTML))), HTML)).toEqual([]);
  });

  it("reports a missing header", () => {
    const headers = responseHeaders(buildCsp(inlineScriptHashes(HTML)));
    headers.delete("X-Frame-Options");
    expect(headerProblems(headers, HTML)).toEqual(['X-Frame-Options: expected "DENY", got nothing']);
  });

  it("reports an inline script the CSP does not allow", () => {
    expect(headerProblems(responseHeaders(buildCsp([])), HTML)).toHaveLength(2);
  });

  it("reports unsafe-inline", () => {
    const csp = `${buildCsp(inlineScriptHashes(HTML))}; script-src-elem 'unsafe-inline'`;
    expect(headerProblems(responseHeaders(csp), HTML)[0]).toContain("unsafe-inline");
  });

  it("reports a missing CSP", () => {
    const headers = responseHeaders("");
    headers.delete("Content-Security-Policy");
    expect(headerProblems(headers, HTML)).toContain("Content-Security-Policy: missing");
  });
});
