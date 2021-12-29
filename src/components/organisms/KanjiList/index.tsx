import KanjiType from 'data/KanjiListType';
import { useEffect, useState, VFC } from 'react';
import GradeCheckList from '../GradeCheckList';

const KanjiList: VFC<{
  setCheckedKanji: (list: string[]) => void;
}> = ({ setCheckedKanji }) => {
  const [isKanjiListLoaded, setIsKanjiListLoaded] = useState(false);
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [errorFetchKanjiList, setErrorFetchKanjiList] = useState<Error | null>(
    null,
  );
  const [checkedList, setCheckedList] = useState<
    { grade: number; checkedIds: string[] }[]
  >(
    [...Array(6).keys()]
      .map((i) => i + 1)
      .map((grade) => ({ grade, checkedIds: [] })),
  );

  const handleChange = (grade: number, checkedIds: string[]) => {
    const list = [
      ...checkedList.filter((x) => x.grade !== grade),
      { grade, checkedIds },
    ];
    setCheckedList((_) => list);
    setCheckedKanji(
      kanjiList
        .filter((l) =>
          list
            .map((x) => x.checkedIds)
            .flat()
            .includes(l.id),
        )
        .map((l) => l.ji),
    );
  };

  // AJAX と API：https://ja.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/json/kanji_list.json`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsKanjiListLoaded(true);
          setKanjiList(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsKanjiListLoaded(true);
          setErrorFetchKanjiList(error);
        },
      );
  }, []);

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
              handleChange={handleChange}
            />
          );
        })}
    </>
  );
};
export default KanjiList;
