import buildDifference from './build.js';
import parsers from './parsers.js';
import stylish from './stylish.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);
  const diff = buildDifference(file1, file2);

  return stylish(diff);
};

export default genDiff;
