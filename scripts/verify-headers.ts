import { ASSET_CACHE_CONTROL, SITE_URL, headerProblems } from "./headers.ts";

// Post-deploy smoke test: every security header must be present with the expected value.
// Usage: node scripts/verify-headers.ts [url]
const ATTEMPTS = 6;
const WAIT_MS = 10_000;

async function check(url: string): Promise<string[]> {
  const page = await fetch(url, { cache: "no-store" });
  const html = await page.text();
  const problems = headerProblems(page.headers, html).map((problem) => `${url} ${problem}`);

  const asset = /\/assets\/[\w./-]+\.js/.exec(html)?.[0];
  if (asset === undefined) {
    problems.push(`${url} no /assets script found to check caching`);
  } else {
    const cacheControl = (await fetch(new URL(asset, url), { cache: "no-store" })).headers.get("Cache-Control");
    if (cacheControl !== ASSET_CACHE_CONTROL) {
      problems.push(`${asset} Cache-Control: expected "${ASSET_CACHE_CONTROL}", got "${cacheControl ?? "nothing"}"`);
    }
  }
  return problems;
}

const base = process.argv[2] ?? SITE_URL;
const urls = [base, new URL("it/", base).href];

let problems: string[] = [];
for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
  problems = (await Promise.all(urls.map(check))).flat();
  if (problems.length === 0) break;
  if (attempt < ATTEMPTS) {
    console.log(`Attempt ${attempt} found ${problems.length} problem(s), retrying in ${WAIT_MS / 1000}s`);
    await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL ${problem}`);
  process.exit(1);
}
console.log(`All security headers verified on ${urls.join(" and ")}`);
