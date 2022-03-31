import path from 'path';
import fs from 'fs';
import buildDifference from './build.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (file) => {
  const filePath = getPath(file);
  const reader = file.startsWith(getPath(filePath)) ? fs.readFileSync(file, 'utf8') : fs.readFileSync(`${getPath(filePath)}/${file}`, 'utf8');
  if (reader.endsWith('.json')) {
    return JSON.parse(reader);
  }

  return 'incorrect file';
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFile(getPath(filePath1));
  const file2 = readFile(getPath(filePath2));

  return buildDifference(file1, file2);
};

export default genDiff;
