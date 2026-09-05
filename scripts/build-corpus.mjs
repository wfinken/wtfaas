import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function parseCategory(text, file, utility) {
  const slug = file.split('/').at(-1).replace(/\.txt$/, '');
  const fail = (line, message) => { throw new Error(`${file}:${line} ${message}`); };
  if (!slugPattern.test(slug)) fail(1, 'Use lowercase letters, digits, and dashes in file names.');
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).map(line => line.trim());
  const first = lines.findIndex(Boolean);
  if (first < 0 || /^(description|aliases):/.test(lines[first])) fail(1, 'Put a display name on the first line.');
  const result = { slug, name: lines[first], description: '', aliases: [], templates: [] };
  const settings = new Set(), seen = new Set();
  let header = true;
  for (let i = first + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) { header = false; continue; }
    if (line.startsWith('#')) continue;
    if (header) {
      const setting = /^([a-z]+):\s*(.*)$/.exec(line);
      if (setting) {
        const [, key, value] = setting;
        if (!['description', 'aliases'].includes(key)) fail(i + 1, `Unknown setting ${key}; use description or aliases.`);
        if (!value || settings.has(key)) fail(i + 1, `Empty or repeated ${key} setting.`);
        settings.add(key);
        if (key === 'description') result.description = value;
        else result.aliases = value.split(',').map(alias => alias.trim().toLowerCase());
        continue;
      }
      header = false;
    }
    if (/[\x00-\x1f\u200b-\u200f\u202a-\u202e]/.test(line)) fail(i + 1, 'Remove control characters.');
    const fields = line.split('|').map(field => field.trim());
    if (fields.length !== (utility === 'blame' ? 3 : 1) || fields.some(field => !field)) fail(i + 1, utility === 'blame' ? 'Use message | culprit | diagnostic check.' : 'Write one response per line without pipe fields.');
    if (seen.has(fields[0])) fail(i + 1, 'Duplicate response.');
    seen.add(fields[0]);
    result.templates.push(utility === 'blame' ? { message: fields[0], culprit: fields[1], check: fields[2] } : fields[0]);
  }
  if (!result.description) fail(1, 'Add description: below the display name.');
  if (!result.templates.length) fail(1, 'Add at least one response after the header.');
  if (result.aliases.some(alias => !slugPattern.test(alias))) fail(1, 'Aliases must be lowercase slugs.');
  return result;
}
export function readCorpus(directory = join(root, 'categories')) {
  const corpus = {}, categoryMetadata = {}, messages = new Map();
  for (const utility of ['ack', 'blame', 'excuse', 'reason', 'status']) {
    corpus[utility] = {}; categoryMetadata[utility] = {};
    const keys = new Map();
    const files = readdirSync(join(directory, utility)).filter(file => file.endsWith('.txt')).sort();
    if (!files.length) throw new Error(`${utility}/ has no category files.`);
    for (const file of files) {
      const location = `${utility}/${file}`;
      const category = parseCategory(readFileSync(join(directory, location), 'utf8'), location, utility);
      for (const key of [category.slug, ...category.aliases]) {
        if (keys.has(key)) throw new Error(`${location}:1 Alias or slug ${key} already belongs to ${keys.get(key)}.`);
        keys.set(key, location);
      }
      for (const template of category.templates) {
        const message = typeof template === 'string' ? template : template.message;
        if (messages.has(message)) throw new Error(`${location}: Duplicate response also in ${messages.get(message)}.`);
        messages.set(message, location);
      }
      const { templates, ...metadata } = category;
      corpus[utility][category.slug] = templates;
      categoryMetadata[utility][category.slug] = metadata;
    }
  }
  return { corpus, categoryMetadata };
}
export function render({ corpus, categoryMetadata }) {
  return '// AUTO-GENERATED. DO NOT EDIT.\n// From categories/*/*.txt. Run `npm run corpus`.\n' +
    `export const corpus = ${JSON.stringify(corpus, null, 2)} as const;\n` +
    `export const categoryMetadata = ${JSON.stringify(categoryMetadata, null, 2)} as const;\n`;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const data = readCorpus();
    mkdirSync(join(root, 'src/generated'), { recursive: true });
    writeFileSync(join(root, 'src/generated/corpus.ts'), render(data));
    const categories = Object.values(data.corpus).flatMap(Object.values);
    console.log(`corpus: 5 utilities, ${categories.length} categories, ${categories.reduce((n, entries) => n + entries.length, 0)} responses`);
  } catch (error) { console.error(`${error.message}\nSee categories/README.md for the format.`); process.exitCode = 1; }
}
