import { VFC } from 'react';
import useKanjiCountList from './index.hooks';

const KanjiCountList: VFC = () => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList, countExam } =
    useKanjiCountList();

  if (errorFetchKanjiList) {
    return <p>Error: {errorFetchKanjiList.message}</p>;
  }

  if (!isKanjiListLoaded) {
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
                <span key={l.ji}>
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
