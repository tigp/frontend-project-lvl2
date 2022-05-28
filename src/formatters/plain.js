import _ from 'lodash';

const prepareValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const formatPlain = (diff, path = []) => {
  const filteredDiff = diff.filter((item) => item.type !== 'unchanged');
  const result = filteredDiff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');

    if (item.type === 'added') {
      const value = prepareValue(item.value);
      return `Property '${node}' was added with value: ${value}`;
    }
    if (item.type === 'removed') {
      return `Property '${node}' was removed`;
    }
    if (item.type === 'updated') {
      const firstValue = prepareValue(item.value.firstValue);
      const secondValue = prepareValue(item.value.secondValue);
      return `Property '${node}' was updated. From ${firstValue} to ${secondValue}`;
    }

    return formatPlain(item.value, newPath);
  }).join('\n');

  return result;
};

export default formatPlain;
