import exampleList from 'data/ExampleList';
import { useEffect, useState, VFC } from 'react';
import { Button } from '@material-ui/core';
import './index.css';

const ExampleList: VFC<{
  targetList: string[];
}> = ({ targetList }) => {
  const [canCheckAnswer, setCanCheckAnswer] = useState(false);

  useEffect(() => {
    setCanCheckAnswer(false);
  }, [targetList]);

  const list = exampleList
    .map((e) =>
      e.map((x) => {
        // TODO: プロジェクト内の型で判定できるようにする
        if (typeof x === 'string') {
          return x;
        }
        const [ji, yomi] = x;

        return targetList.filter((t) => ji.includes(t)).length
          ? [ji, yomi]
          : yomi;
      }),
    )
    .filter((e) => e.find((x) => typeof x !== 'string'));

  return (
    <>
      <ul className={canCheckAnswer ? 'show-answer' : 'hide-answer'}>
        {list.map((l) => (
          <li key={`exam-${l.toString()}`}>
            {l.map((x) => {
              if (typeof x === 'string') {
                return x;
              }
              const [ji, yomi] = x;

              return (
                <ruby
                  className="example-kanji-block"
                  key={`${l.toString()}-${ji}`}
                >
                  <span className="example-kanji">{ji}</span>
                  <rp>(</rp>
                  <rt>{yomi}</rt>
                  <rp>)</rp>
                </ruby>
              );
            })}
          </li>
        ))}
      </ul>

      {/* 学習対象の漢字の問題文を表示 */}
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
export default ExampleList;
