type Onyomi = {
  yomi: string;
  okuri?: string;
};
type Kanji = {
  ji: string;
  kun: string[];
  on: Onyomi[];
  grade: number;
};
// TODO: スクレイピング候補 https://www.benricho.org/kanji/kyoikukanji/1nen.html
// TODO: 別ファイルへ
const kanjiList: Kanji[] = [
  {
    ji: '一',
    kun: ['イチ', 'イツ'],
    on: [
      {
        yomi: 'ひと',
      },
      {
        yomi: 'ひと',
        okuri: 'つ',
      },
    ],
    grade: 1,
  },
  {
    ji: '二',
    kun: ['二'],
    on: [
      {
        yomi: 'ふた',
      },
      {
        yomi: 'ふた',
        okuri: 'つ',
      },
    ],
    grade: 1,
  },
  {
    ji: '伝',
    kun: ['デン'],
    on: [
      {
        yomi: 'つた',
        okuri: 'わる',
      },
      {
        yomi: 'つた',
        okuri: 'える',
      },
      {
        yomi: 'つた',
        okuri: 'う',
      },
    ],
    grade: 4,
  },
];

export { kanjiList };
export type { Kanji };
