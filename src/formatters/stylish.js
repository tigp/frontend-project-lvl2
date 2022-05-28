import _ from 'lodash';

const valueToString = (value, replacer, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const currentIndent = replacer.repeat(currentDepth);
    const bracketIndent = replacer.repeat(currentDepth - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = '    ';
    const currentIndent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth - 1);
    const result = node.flatMap(({
      type, key, value,
    }) => {
      switch (type) {
        case 'complex':
          return `${currentIndent.slice(2)}  ${key}: ${iter(value, depth + 1)}`;
        case 'added':
          return `${currentIndent.slice(2)}+ ${key}: ${valueToString(value, replacer, depth + 1)}`;
        case 'removed':
          return `${currentIndent.slice(2)}- ${key}: ${valueToString(value, replacer, depth + 1)}`;
        case 'updated':
          return `${currentIndent.slice(2)}- ${key}: ${valueToString(value.firstValue, replacer, depth + 1)}\n${currentIndent.slice(2)}+ ${key}: ${valueToString(value.secondValue, replacer, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent.slice(2)}  ${key}: ${valueToString(value, replacer, depth + 1)}`;
        default:
          throw new Error(`Incorrect type ${type}!`);
      }
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };

  return iter(tree, 1);
};

export default formatStylish;
