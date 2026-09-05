import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseCategory, readCorpus, render } from '../scripts/build-corpus.mjs';

describe('contributor corpus format', () => {
  it('parses SignaaS-style headers, comments, BOM, and CRLF', () => {
    const category = parseCategory('\uFEFFReceived\r\ndescription: Receipt confirmation.\r\naliases: receipt, got-it\r\n\r\n# a comment\r\nGot your message.\r\n\r\nMessage delivered.\r\n', 'ack/received.txt', 'ack');
    expect(category.aliases).toEqual(['receipt', 'got-it']);
    expect(category.templates).toEqual(['Got your message.', 'Message delivered.']);
  });
  it('preserves structured blame fields', () => {
    expect(parseCategory('Outage\ndescription: Investigate.\n\nCheck the phonebook. | DNS | Compare resolver answers.\n', 'blame/outage.txt', 'blame').templates).toEqual([{ message: 'Check the phonebook.', culprit: 'DNS', check: 'Compare resolver answers.' }]);
  });
  it.each([
    ['Title\n\nHello', 'description'],
    ['Title\ndescription: Test\n\n', 'at least one'],
    ['Title\ndescription: Test\n\nHello\nHello', 'Duplicate'],
    ['Title\ndescriptoin: Test\n\nHello', 'Unknown setting'],
    ['Title\ndescription: Test\naliases: not valid\n\nHello', 'Aliases'],
    ['Title\ndescription: Test\n\nHello | ignored', 'pipe'],
    ['Title\ndescription: Test\n\nHello\u202e', 'control'],
  ])('reports actionable source errors', (text, message) => {
    expect(() => parseCategory(text, 'ack/test.txt', 'ack')).toThrow(message);
    expect(() => parseCategory(text, 'ack/test.txt', 'ack')).toThrow('ack/test.txt:');
  });
  it('rejects incomplete blame records', () => {
    expect(() => parseCategory('Title\ndescription: Test\n\nHello | DNS |', 'blame/test.txt', 'blame')).toThrow('diagnostic check');
  });
  it('discovers new files and rejects aliases colliding with category slugs', () => {
    const directory = mkdtempSync(join(tmpdir(), 'wtfaas-corpus-test-'));
    try {
      for (const utility of ['ack','blame','excuse','reason','status']) {
        mkdirSync(join(directory, utility));
        writeFileSync(join(directory, utility, 'test.txt'), `Test\ndescription: A test.\n\n${utility} message${utility==='blame' ? ' | DNS | Check DNS.' : ''}\n`);
      }
      writeFileSync(join(directory, 'ack', 'new.txt'), 'New\ndescription: New category.\naliases: fresh\n\nA newly added response.\n');
      expect(readCorpus(directory).corpus.ack.new).toEqual(['A newly added response.']);
      writeFileSync(join(directory, 'ack', 'new.txt'), 'New\ndescription: New category.\naliases: test\n\nA newly added response.\n');
      expect(() => readCorpus(directory)).toThrow('already belongs');
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it('compiles every source file reproducibly and provides variety in every category', () => {
    const data = readCorpus();
    const categories = Object.values(data.corpus).flatMap(Object.values);
    expect(categories.length).toBeGreaterThanOrEqual(113);
    expect(categories.every(entries => entries.length >= 20)).toBe(true);
    expect(categories.reduce((n, entries) => n + entries.length, 0)).toBeGreaterThanOrEqual(2260);
    expect(render(data)).toBe(readFileSync(new URL('../src/generated/corpus.ts', import.meta.url), 'utf8'));
  });
});
