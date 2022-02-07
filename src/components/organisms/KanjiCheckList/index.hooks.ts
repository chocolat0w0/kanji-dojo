import KanjiType from 'data/KanjiListType';
import { useState } from 'react';
import useFetchKanjiList from '../../hooks/useFetchKanjiList.hooks';

const useKanjiCheckList = (
  setCheckedKanji: (list: string[]) => void,
): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  checkedList: { grade: number; checkedIds: string[] }[];
  handleChange: (grade: number) => (checkedIds: string[]) => void;
} => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList } =
    useFetchKanjiList();

  const [checkedList, setCheckedList] = useState<
    { grade: number; checkedIds: string[] }[]
  >(
    [...Array(6).keys()]
      .map((i) => i + 1)
      .map((grade) => ({ grade, checkedIds: [] })),
  );

  // 1学年分の選択リストをもらって全学年のリストを更新する
  const handleChange = (grade: number) => (checkedIds: string[]) => {
    setCheckedList((prev) => {
      const list = [
        ...prev.filter((x) => x.grade !== grade),
        { grade, checkedIds },
      ];
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

      return list;
    });
  };

  return {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
    checkedList,
    handleChange,
  };
};

export default useKanjiCheckList;
