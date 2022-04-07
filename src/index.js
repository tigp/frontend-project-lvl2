import buildDifference from './build.js';
import parsers from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);

  return buildDifference(file1, file2);
};

export default genDiff;
