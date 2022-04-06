import path from 'path';
import fs from 'fs';
import buildDifference from './build.js';

const rootPath = path.resolve(process.cwd());

const readFile = (filepath) => {
  const file = filepath.startsWith(rootPath) ? fs.readFileSync(filepath, 'utf8') : fs.readFileSync(`${rootPath}/${filepath}`, 'utf8');
  if (filepath.endsWith('.json')) {
    return JSON.parse(file);
  }

  return 'Incorrect file';
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);

  return buildDifference(file1, file2);
};

export default genDiff;
