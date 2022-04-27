import _ from 'lodash';

const buildDifference = (file1, file2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

  const diff = sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.has(file2, key)) {
      return { type: 'deleted', key, value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { type: 'unchanged', key, value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'nested', key, children: buildDifference(value1, value2) };
    }
    return { type: 'changed', key, value: { value1, value2 } };
  });

  return diff;
};

export default buildDifference;
