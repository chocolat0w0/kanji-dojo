import * as fs from 'fs';
import { format, getJson } from './format';

const INPUT_FILE_PATH = './exam_list_morph.json';
const OUTPUT_FILE_PATH = './out/exam_list.json';

type inputListType = (string[] | string[][])[][];
try {
  const inputFile = fs.readFileSync(INPUT_FILE_PATH, 'utf-8');
  const inputList: inputListType = JSON.parse(inputFile) as inputListType;
  const result = Object.values(inputList).map((sentence) =>
    getJson(format(sentence)),
  );
  fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(result), (error) => {
    if (error) {
      console.error(`write error: ${error.message}`);
    }
  });
} catch (err: unknown) {
  if (err instanceof Error) {
    throw new Error(`file error: ${err.message}`);
  }
}
