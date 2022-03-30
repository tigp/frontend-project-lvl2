#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import buildDifference from './buildDifference.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filePath) => {
  const file = filePath.startsWith(getPath) ? fs.readFileSync(filePath, 'utf8') : fs.readFileSync(`${getPath}/${filePath}`, 'utf8');
  if (file.endsWith('.json')) {
    return JSON.parse(file);
  }

  return 'incorrect file';
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFile(getPath(filePath1));
  const file2 = readFile(getPath(filePath2));
  console.log(buildDifference(file1, file2));

  return buildDifference(file1, file2);
};

export default genDiff;
