import genDiff from '../src/index.js';

const file1 = '__fixtures__/file1.json';
const file2 = '__fixtures__/file2.json';

const result = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(result);
});
