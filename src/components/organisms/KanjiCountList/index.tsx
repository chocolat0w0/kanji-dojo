import { VFC } from 'react';
import useKanjiCountList from './index.hooks';
import './index.css';

const KanjiCountList: VFC = () => {
  const { errorFetch, isLoaded, kanjiList, countExam } = useKanjiCountList();

  const countClass = (count: number): string => {
    if (count === 0) return 'exam-0';
    if (count < 2) return 'exam-few';

    return 'exam-enough';
  };

  if (errorFetch) {
    return <p>Error: {errorFetch.message}</p>;
  }

  if (!isLoaded) {
    return <p>loading...</p>;
  }

  return (
    <>
      <p>Count Mode</p>
      {[...Array(6).keys()]
        .map((i) => i + 1)
        .map((grade) => {
          const gradeList = kanjiList.filter((k) => k.grade === grade);

          return (
            <section key={`grade${grade}`}>
              <h1>{grade}年の漢字</h1>
              {gradeList.map((l) => (
                <span
                  key={l.ji}
                  className={`kanji ${countClass(countExam(l.ji))}`}
                >
                  {l.ji}({countExam(l.ji).toString()})
                </span>
              ))}
            </section>
          );
        })}
    </>
  );
};
export default KanjiCountList;
