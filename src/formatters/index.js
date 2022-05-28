import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormateName = (diff, formateName) => {
  switch (formateName) {
    case ('stylish'):
      return stylish(diff);
    case ('plain'):
      return plain(diff);
    case ('json'):
      return json(diff);
    default:
      throw new Error(`Unknow format ${formateName}`);
  }
};

export default getFormateName;
