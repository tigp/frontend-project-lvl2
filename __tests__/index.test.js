import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe.each(['stylish', 'plain', 'json'])("gendiff's format %s", (format) => {
  const expected = readFile(`expected_${format}.txt`);

  test.each(['json', 'yml'])("file's format %s", (fileExtension) => {
    const filename1 = getFixturePath(`file1.${fileExtension}`);
    const filename2 = getFixturePath(`file2.${fileExtension}`);

    expect(genDiff(filename1, filename2, format)).toEqual(expected);
  });
});
