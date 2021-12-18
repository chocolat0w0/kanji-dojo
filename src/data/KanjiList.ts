type Onyomi = {
  yomi: string;
  okuri?: string;
};
type Kanji = {
  id: string;
  ji: string;
  kun: string[];
  on: Onyomi[];
  grade: number;
};
// TODO: スクレイピング候補 https://www.benricho.org/kanji/kyoikukanji/1nen.html
// TODO: 別ファイルへ
const kanjiList: Kanji[] = [
  {
    id: '1-1',
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
    id: '1-2',
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
    id: '4-1',
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
