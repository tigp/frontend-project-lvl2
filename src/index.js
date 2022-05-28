import buildDifference from './build.js';
import parsers from './parsers.js';
import getFormateName from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = parsers(filePath1);
  const file2 = parsers(filePath2);
  const diff = buildDifference(file1, file2);

  return getFormateName(diff, formatName);
};
