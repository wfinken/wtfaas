import { readFile, mkdir, writeFile } from 'node:fs/promises';
const source = JSON.parse(await readFile(new URL('../corpus/catalog.json', import.meta.url)));
for (const [module, categories] of Object.entries(source)) for (const [category, entries] of Object.entries(categories)) {
  if (!Array.isArray(entries) || !entries.length || new Set(entries.map(x => JSON.stringify(x))).size !== entries.length) throw new Error(`Invalid or duplicate corpus: ${module}/${category}`);
}
await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await writeFile(new URL('../src/generated/corpus.ts', import.meta.url), `// AUTO-GENERATED. DO NOT EDIT.\n// Run \`npm run corpus\`.\nexport const corpus = ${JSON.stringify(source, null, 2)} as const;\n`);
console.log(`Compiled ${Object.values(source).reduce((n, c) => n + Object.values(c).reduce((m, x) => m + x.length, 0), 0)} corpus entries.`);
