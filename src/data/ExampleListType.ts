type KanjiPart = { t: 'kanji'; v: [string, string] };
type KanaPart = { t: 'kana'; v: string };
type ExampleType = (KanjiPart | KanaPart)[];

export type { ExampleType, KanaPart, KanjiPart };
