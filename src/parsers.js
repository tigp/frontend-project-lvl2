import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const readFile = (filepath) => {
  const rootPath = path.resolve(process.cwd());
  const file = filepath.startsWith(rootPath)
    ? fs.readFileSync(filepath, 'utf8')
    : fs.readFileSync(`${rootPath}/__fixtures__/${filepath}`, 'utf8');
  if (filepath.endsWith('.json')) {
    return JSON.parse(file);
  } if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return yaml.load(file);
  }

  return 'Incorrect file format';
};

export default readFile;
