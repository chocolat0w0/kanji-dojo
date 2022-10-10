import { SelectedKanjiType, SelectedStatusType } from 'data/SelectedKanjiType';
import { VFC } from 'react';
import GradeCheckList from '../GradeCheckList';
import useKanjiSelector from './index.hooks';

const KanjiSelector: VFC<{
  statusList: SelectedStatusType[];
  setStatusList: React.Dispatch<React.SetStateAction<SelectedStatusType[]>>;
  setSelectedKanji: React.Dispatch<React.SetStateAction<SelectedKanjiType[]>>;
}> = ({ statusList, setStatusList, setSelectedKanji }) => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList, handleChange } =
    useKanjiSelector(setStatusList, setSelectedKanji);

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
