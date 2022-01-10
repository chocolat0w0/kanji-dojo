import fetch from 'node-fetch';
import * as fs from 'fs';

const INPUT_FILE_PATH = './exam_list.json';
const OUTPUT_FILE_PATH = './out/exam_list_morph.json';

const param = {
  app_id: '7dcdb0e68b1ab28f8c77534c4dc4f041b6fdc78b7f39a42a7d6071492b52d057',
  info_filter: 'form|read',
};

// API実行後の中間保存ファイルがない場合は、空オブジェクトで作成
if (!fs.existsSync(OUTPUT_FILE_PATH)) {
  fs.writeFileSync(OUTPUT_FILE_PATH, '{}');
}

let examList;
let morphList;
try {
  const examFile = fs.readFileSync(INPUT_FILE_PATH, 'utf-8');
  examList = JSON.parse(examFile);
  const morphFile = fs.readFileSync(OUTPUT_FILE_PATH, 'utf-8');
  morphList = JSON.parse(morphFile);
} catch (err) {
  throw new Error(`file error: ${err.message}`);
}

if (!Array.isArray(examList)) {
  throw new Error(
    '問題文は配列で入力してください。　例：["漢字が混ざっている文章。", "花が一つ咲いた。"]',
  );
}

Promise.all(
  examList
    .filter((exam) => !Object.keys(morphList).includes(exam))
    .map((exam) =>
      fetch('https://labs.goo.ne.jp/api/morph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_id: param.app_id,
          sentence: exam,
          info_filter: param.info_filter,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          return { [exam]: data.word_list[0] };
        })
        .catch((error) => {
          console.error('Error:', error);
        }),
    ),
).then(
  (result) => {
    if (result.length === 0) {
      console.log(`${INPUT_FILE_PATH} の問題文は、全て形態素解析済みです。`);
      return;
    }
    const resultJson = result.reduce((prev, current) => {
      return { ...prev, ...current };
    });
    const json = { ...morphList, ...resultJson };
    console.log(`新しく ${OUTPUT_FILE_PATH} に追加された問題文`);
    Object.keys(resultJson).forEach((x) => console.log(x));
    fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(json), (error) => {
      if (error) {
        console.error(`write error: ${error.message}`);
      }
    });
  },
  (error) => {
    console.error(error);
  },
);
