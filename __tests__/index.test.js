import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const file1 = '__fixtures__/file1.json';
const file2 = '__fixtures__/file2.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const result = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(result);
});
