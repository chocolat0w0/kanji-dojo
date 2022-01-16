import { join, zip, devide, format, getJson } from './format';

test('形態素統合のテスト', () => {
  expect(join(['漢,字', 'カン,ジ'])).toStrictEqual(['漢,字', 'カン,ジ']);
  expect(
    join([
      ['混ざ', 'マザ'],
      ['っ', 'ッ'],
      ['て', 'テ'],
      ['い', 'イ'],
      ['る', 'ル'],
    ]),
  ).toStrictEqual(['混ざっている', 'マザッテイル']);
});

test('zip関数のテスト', () => {
  expect(zip(['1', '2'], ['A', 'B'])).toStrictEqual([
    ['1', 'A'],
    ['2', 'B'],
  ]);
  expect(zip(['1', '2'], ['A'])).toStrictEqual([['1', 'A']]);
  expect(zip(['1', '2'], ['A', 'B', 'C'])).toStrictEqual([
    ['1', 'A'],
    ['2', 'B'],
  ]);
  expect(zip(['1', '2'], ['A', 'B'], ['あ', 'い'])).toStrictEqual([
    ['1', 'A', 'あ'],
    ['2', 'B', 'い'],
  ]);
});

test('形態素分割のテスト', () => {
  expect(devide(['漢,字', 'カン,ジ'])).toStrictEqual([
    ['漢', 'カン'],
    ['字', 'ジ'],
  ]);
  expect(devide(['混ざっている', 'マザッテイル'])).toStrictEqual([
    ['混ざっている', 'マザッテイル'],
  ]);
});

test('単語の区切り箇所整形の配列出力テスト', () => {
  const input = [
    ['漢,字', 'カン,ジ'],
    ['が', 'ガ'],
    [
      ['混ざ', 'マザ'],
      ['っ', 'ッ'],
      ['て', 'テ'],
      ['い', 'イ'],
      ['る', 'ル'],
    ],
    ['文,章', 'ブン,ショウ'],
    ['。', ''],
  ];
  const expected = [
    ['漢', 'カン'],
    ['字', 'ジ'],
    ['が', 'ガ'],
    ['混ざっている', 'マザッテイル'],
    ['文', 'ブン'],
    ['章', 'ショウ'],
    ['。', ''],
  ];

  expect(format(input)).toStrictEqual(expected);
});

test('問題文json整形テスト', () => {
  const input = [
    ['漢', 'カン'],
    ['字', 'ジ'],
    ['が', 'ガ'],
    ['混ざっている', 'マザッテイル'],
    ['文', 'ブン'],
    ['章', 'ショウ'],
    ['。', ''],
  ];
  const expected = [
    { t: 'kanji', v: ['漢', 'かん'] },
    { t: 'kanji', v: ['字', 'じ'] },
    { t: 'kana', v: 'が' },
    { t: 'kanji', v: ['混ざっている', 'まざっている'] },
    { t: 'kanji', v: ['文', 'ぶん'] },
    { t: 'kanji', v: ['章', 'しょう'] },
    { t: 'kana', v: '。' },
  ];

  expect(getJson(input)).toStrictEqual(expected);
});
