type KanjiPart = { t: 'kanji'; v: [string, string] };
type KanaPart = { t: 'kana'; v: string };
type QuestionType = (KanjiPart | KanaPart)[];

export type { QuestionType, KanaPart, KanjiPart };
