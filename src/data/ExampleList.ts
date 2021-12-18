type KanjiPart = [string, string];
type KanaPart = string;
type exampleType = (KanjiPart | KanaPart)[];
const exampleList: exampleType[] = [
  [['花', 'はな'], 'が', ['一つ', 'ひとつ'], ['咲いた', 'さいた'], '。'],
  [['答え', 'こたえ'], 'を', ['二つ', 'ふたつ'], ['伝えた', 'つたえた'], '。'],
  [
    ['今日', 'きょう'],
    'のご',
    ['飯', 'はん'],
    'は',
    ['焼き', 'やき'],
    ['魚', 'ざかな'],
    'です。',
  ],
];

export default exampleList;
export type { exampleType, KanaPart, KanjiPart };
