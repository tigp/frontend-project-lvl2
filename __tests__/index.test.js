import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gediff', () => {
  const expected = fs.readFileSync(getFixturePath('expected'), 'utf-8');
  const test1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const test2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const test3 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.json'));

  expect(test1).toEqual(expected);
  expect(test2).toEqual(expected);
  expect(test3).toEqual(expected);
});
