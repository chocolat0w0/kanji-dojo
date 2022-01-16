type KanjiPart = { t: 'kanji'; v: [string, string] };
type KanaPart = { t: 'kana'; v: string };
type exampleType = (KanjiPart | KanaPart)[];
const exampleList: exampleType[] = [
  [
    { t: 'kanji', v: ['花', 'はな'] },
    { t: 'kana', v: 'が' },
    { t: 'kanji', v: ['一つ', 'ひとつ'] },
    { t: 'kanji', v: ['咲いた', 'さいた'] },
    { t: 'kana', v: '。' },
  ],
  [
    { t: 'kanji', v: ['答え', 'こたえ'] },
    { t: 'kana', v: 'を' },
    { t: 'kanji', v: ['二つ', 'ふたつ'] },
    { t: 'kanji', v: ['伝えた', 'つたえた'] },
    { t: 'kana', v: '。' },
  ],
  [
    { t: 'kanji', v: ['今日', 'きょう'] },
    { t: 'kana', v: 'のご' },
    { t: 'kanji', v: ['飯', 'はん'] },
    { t: 'kana', v: 'は' },
    { t: 'kanji', v: ['焼き', 'やき'] },
    { t: 'kanji', v: ['魚', 'ざかな'] },
    { t: 'kana', v: 'です。' },
  ],
];

export default exampleList;
export type { exampleType, KanaPart, KanjiPart };
