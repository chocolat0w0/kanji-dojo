import { VFC } from 'react';
import GradeCheckList from '../GradeCheckList';
import useKanjiCheckList from './index.hooks';

const KanjiCheckList: VFC<{
  setCheckedKanji: (list: string[]) => void;
}> = ({ setCheckedKanji }) => {
  const {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
    checkedList,
    handleChange,
  } = useKanjiCheckList(setCheckedKanji);

  if (errorFetchKanjiList) {
    return <p>Error: {errorFetchKanjiList.message}</p>;
  }

  if (!isKanjiListLoaded) {
    return <p>loading...</p>;
  }

  return (
    <>
      {[...Array(6).keys()]
        .map((i) => i + 1)
        .map((grade) => {
          const gradeList = kanjiList.filter((k) => k.grade === grade);

          return (
            <GradeCheckList
              key={`grade-${grade}`}
              grade={grade}
              list={gradeList}
              checkedList={
                checkedList.find((l) => l.grade === grade)?.checkedIds || []
              }
              handleChange={handleChange(grade)}
            />
          );
        })}
    </>
  );
};
export default KanjiCheckList;
