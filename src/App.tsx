import React, { VFC } from 'react';
import './App.css';

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
const kanjis: Kanji[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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

const App: VFC = () => (
  <div className="App">
    <header className="App-header">漢字道場</header>
    <main>
      {/* 漢字を学習年別に表示 */}
      {[...Array(6).keys()]
        .map((i) => i + 1)
        .map((grade) => (
          <section>
            <h1>{grade}年の漢字</h1>
            {kanjis
              .filter((k) => k.grade === grade)
              .map((k) => {
                const { id } = k;

                return (
                  <label htmlFor={id}>
                    <input id={id} name="kanji" type="checkbox" />
                    {k.ji}
                  </label>
                );
              })}
          </section>
        ))}
      {/* 学習対象にした漢字を表示 */}

      {/* 学習対象の漢字の問題文を表示 */}
    </main>
  </div>
);

export default App;
