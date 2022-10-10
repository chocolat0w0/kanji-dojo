import { VFC } from 'react';

type FuriganaBoxType = {
  kanji: string;
  furigana: string;
  visibleAnswer: boolean;
};

const FuriganaBox: VFC<FuriganaBoxType> = ({
  kanji,
  furigana,
  visibleAnswer,
}) => (
  <ruby
    className={`furigana-box ${visibleAnswer ? 'show-answer' : 'hide-answer'}`}
  >
    <span className="furigana-box-kanji">{kanji}</span>
    <rp>(</rp>
    <rt>{furigana}</rt>
    <rp>)</rp>
  </ruby>
);

export default FuriganaBox;
