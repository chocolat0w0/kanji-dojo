import KanjiType from 'data/KanjiListType';
import { useState } from 'react';
import useFetchKanjiList from '../../../hooks/useFetchKanjiList.hooks';

export const CheckedType = {
  FALSE: 'false',
  MUST: 'must',
  USABLE: 'usable',
} as const;
export type CheckedType = typeof CheckedType[keyof typeof CheckedType];

const useKanjiCheckList = (
  setCheckedKanji: (list: string[]) => void,
): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  checkedList: { id: string; grade: number; status: CheckedType }[];
  handleChange: (
    grade: number,
  ) => (gradeCheckedList: { id: string; status: CheckedType }[]) => void;
} => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList } =
    useFetchKanjiList();

  const [checkedList, setCheckedList] = useState<
    { id: string; grade: number; status: CheckedType }[]
  >(
    kanjiList.map((i) => ({
      id: i.id,
      grade: i.grade,
      status: CheckedType.FALSE,
    })),
  );

  // 1学年分の選択リストをもらって全学年のリストを更新する
  const handleChange =
    (grade: number) =>
    (gradeCheckedList: { id: string; status: CheckedType }[]) => {
      setCheckedList((prev) => {
        const newList = gradeCheckedList.map((x) => ({
          id: x.id,
          grade,
          status: x.status,
        }));
        const list = [...prev.filter((x) => x.grade !== grade), ...newList];

        // TODO: あとでMUST, USABLE分ける
        const tmp = kanjiList
          .filter(
            (l) =>
              (list.find((x) => x.id === l.id)?.status ?? CheckedType.FALSE) !==
              CheckedType.FALSE,
          )
          .map((l) => l.ji);
        setCheckedKanji(tmp);

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
