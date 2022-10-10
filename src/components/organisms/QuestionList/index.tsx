import { VFC } from 'react';
import { Button } from '@material-ui/core';
import './index.css';
import FuriganaBox from 'components/atoms/FuriganaBox';
import useQuestionList from './index.hooks';

const QuestionList: VFC<{
  must: string[];
  usable: string[];
}> = ({ must, usable }) => {
  const { hasError, isLoaded, list, canCheckAnswer, setCanCheckAnswer } =
    useQuestionList(must, usable);

  if (hasError) {
    return <p>Error: {hasError.message}</p>;
  }

  if (!isLoaded) {
    return <p>loading...</p>;
  }

  return (
    <>
      <ul>
        {list.map((l) => (
          <li key={`exam-${l.toString()}`}>
            {l.map((x) => {
              if (typeof x === 'string') {
                return x;
              }

              const [ji, yomi] = x;

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
