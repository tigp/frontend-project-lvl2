import _ from 'lodash';

const buildDifference = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

  const diff = keys.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `- ${key}: ${file1[key]}\n`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `+ ${key}: ${file2[key]}\n`;
    }
    if ((_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key])) {
      return `  ${key}: ${file2[key]}\n`;
    }
    if ((_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key])) {
      return [`- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`];
    }
  });
  return `{\n${diff.join('')}}`;
};

export default buildDifference;
