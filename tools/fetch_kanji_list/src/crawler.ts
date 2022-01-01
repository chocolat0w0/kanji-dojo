import superagent from 'superagent';
import cheerio from 'cheerio';

const URL_BASE = 'https://www.benricho.org/kanji/kyoikukanji/';
const FILE_PATH = './kanji_list.json';

const fetchHtml = async (url: string): Promise<string> => {
  const result = await superagent.get(url);
  return result.text;
};

const getKanjiJson = (html: string, grade: number): object => {
  const $ = cheerio.load(html);
  // 4年生だけidがつけられていないので特殊処理
  const kanjiTable = grade === 4 ? $('table').find('table') : $('#font-main');
  const kanjiItems = kanjiTable.find('td');

  const kanjiJson = kanjiItems
    .map((index, elem) => {
      const contents = $(elem)
        .html()
        ?.split(/<[^>]+>/)
        .map((text) => text.trim());
      if (!contents || contents[0] === '&nbsp;') return;

      const ji = contents[0];
      const kun = contents
        .slice(1)
        .filter((text) => /^[\u30A0-\u30FF]+$/.test(text)); // カタカナの正規表現
      const on = contents
        .slice(1)
        .filter((text) => /^[\u3040-\u309F\-]+$/.test(text)); // ひらがなと"-"の正規表現
      return {
        id: `${grade}-${index}`,
        ji: ji,
        kun: kun,
        on: on,
        grade: grade,
      };
    })
    .toArray();
  return kanjiJson;
};

const fs = require('fs');

Promise.all(
  [...Array(6).keys()]
    .map((i) => i + 1)
    .map((i) => {
      return fetchHtml(`${URL_BASE}${i}nen.html`);
    }),
).then(
  (results) => {
    const json = results.map((result, i) => getKanjiJson(result, i + 1)).flat();
    fs.writeFile(FILE_PATH, JSON.stringify(json), (error: Error) => {
      if (error) {
        console.error(`write error: ${error.message}`);
      }
    });
  },
  (error) => console.error(`fetch error: ${error.message}`),
);
