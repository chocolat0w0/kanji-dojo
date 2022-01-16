import * as fs from 'fs';
import { format, getJson } from './format';

const INPUT_FILE_PATH = './exam_list_morph.json';

type inputListType = (string[] | string[][])[][];
try {
  const inputFile = fs.readFileSync(INPUT_FILE_PATH, 'utf-8');
  const inputList: inputListType = JSON.parse(inputFile) as inputListType;
  const result = Object.values(inputList).map((sentence) =>
    getJson(format(sentence)),
  );
  console.log(JSON.stringify(result));
} catch (err: unknown) {
  if (err instanceof Error) {
    throw new Error(`file error: ${err.message}`);
  }
}
