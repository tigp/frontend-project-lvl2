import { readFileSync } from 'fs';
import path from 'path';
import buildDifference from './build.js';
import parsers from './parsers.js';
import getFormateName from './formatters/index.js';

const readFile = (filepath) => {
  const rootPath = path.resolve(process.cwd());

  return filepath.startsWith(rootPath)
    ? readFileSync(filepath, 'utf8')
    : readFileSync(`${rootPath}/__fixtures__/${filepath}`, 'utf8');
};

const getFileFormat = (filename) => path.extname(filename).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(readFile(filepath1), getFileFormat(filepath1));
  const file2 = parsers(readFile(filepath2), getFileFormat(filepath2));
  const difference = buildDifference(file1, file2);

  return getFormateName(difference, formatName);
};
