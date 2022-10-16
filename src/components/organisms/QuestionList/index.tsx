import { VFC } from 'react';
import { Button } from '@material-ui/core';
import './index.css';
import FuriganaBox from 'components/atoms/FuriganaBox';
import useQuestionList from './index.hooks';

const QuestionList: VFC<{
  must: string[];
  usable: string[];
  max: number;
}> = ({ must, usable, max }) => {
  const {
    hasError,
    isLoaded,
    list,
    shuffle,
    canCheckAnswer,
    setCanCheckAnswer,
  } = useQuestionList(must, usable, max);

  if (hasError) {
    return <p>Error: {hasError.message}</p>;
  }

  if (!isLoaded) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Button onClick={shuffle} variant="contained">
        シャッフル
      </Button>
      <ul>
        {list.map((l) => (
          <li key={l.id}>
            {l.q.map((x) => {
              if (x.t === 'kana') {
                return x.v;
              }

              const [ji, yomi] = x.v;

              return (
                <FuriganaBox
                  kanji={ji}
                  furigana={yomi}
                  visibleAnswer={canCheckAnswer}
                  key={`${l.toString()}-${ji}`}
                />
              );
            })}
          </li>
        ))}
      </ul>

      <Button
        variant="contained"
        disabled={!list.length}
        onClick={(_) => setCanCheckAnswer(true)}
      >
        答えを見る
      </Button>
    </>
  );
};
export default QuestionList;
