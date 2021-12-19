import exampleList from 'data/ExampleList';
import { VFC } from 'react';
import './ExampleList.css';

const ExampleList: VFC<{
  targetList: string[];
  canCheckAnswer: boolean;
}> = ({ targetList, canCheckAnswer }) => {
  const list = exampleList
    .map((e) =>
      e.map((x) => {
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
  );
};
export default ExampleList;
