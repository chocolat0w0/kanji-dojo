type KanjiPart = { type: 'kanji'; value: [string, string] };
type KanaPart = { type: 'kana'; value: string };
type exampleType = (KanjiPart | KanaPart)[];
const exampleList: exampleType[] = [
  [
    { type: 'kanji', value: ['花', 'はな'] },
    { type: 'kana', value: 'が' },
    { type: 'kanji', value: ['一つ', 'ひとつ'] },
    { type: 'kanji', value: ['咲いた', 'さいた'] },
    { type: 'kana', value: '。' },
  ],
  [
    { type: 'kanji', value: ['答え', 'こたえ'] },
    { type: 'kana', value: 'を' },
    { type: 'kanji', value: ['二つ', 'ふたつ'] },
    { type: 'kanji', value: ['伝えた', 'つたえた'] },
    { type: 'kana', value: '。' },
  ],
  [
    { type: 'kanji', value: ['今日', 'きょう'] },
    { type: 'kana', value: 'のご' },
    { type: 'kanji', value: ['飯', 'はん'] },
    { type: 'kana', value: 'は' },
    { type: 'kanji', value: ['焼き', 'やき'] },
    { type: 'kanji', value: ['魚', 'ざかな'] },
    { type: 'kana', value: 'です。' },
  ],
];

export default exampleList;
export type { exampleType, KanaPart, KanjiPart };
