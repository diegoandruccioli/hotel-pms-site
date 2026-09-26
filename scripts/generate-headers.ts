import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildHeadersFile, inlineScriptHashes } from "./headers.ts";

const OUT_DIR = "build/client";

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

const hashes = new Set<string>();
for (const file of htmlFiles(OUT_DIR)) {
  for (const hash of inlineScriptHashes(readFileSync(file, "utf8"))) hashes.add(hash);
}

writeFileSync(join(OUT_DIR, "_headers"), buildHeadersFile([...hashes]));
console.log(`_headers written with ${hashes.size} inline script hashes`);
