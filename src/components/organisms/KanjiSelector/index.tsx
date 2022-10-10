import { VFC } from 'react';
import GradeCheckList from '../GradeCheckList';
import useKanjiSelector, { SelectedKanjiType } from './index.hooks';

const KanjiSelector: VFC<{
  setSelectedKanji: (list: SelectedKanjiType[]) => void;
}> = ({ setSelectedKanji }) => {
  const {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
    statusList,
    handleChange,
  } = useKanjiSelector(setSelectedKanji);

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
              statusList={statusList
                .filter((l) => l.grade === grade)
                .map((l) => ({ id: l.id, status: l.status }))}
              handleChange={handleChange(grade)}
            />
          );
        })}
    </>
  );
};
export default KanjiSelector;
