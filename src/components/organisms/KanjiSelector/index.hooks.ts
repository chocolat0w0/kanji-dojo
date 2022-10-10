import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import KanjiType from 'data/KanjiListType';
import { useState } from 'react';
import useFetchKanjiList from '../../../hooks/useFetchKanjiList.hooks';

type SelectedKanjiType = {
  ji: string;
  status: CheckedType;
};

const useKanjiSelector = (
  setSelectedKanji: (list: SelectedKanjiType[]) => void,
): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  statusList: { id: string; grade: number; status: CheckedType }[];
  handleChange: (
    grade: number,
  ) => (gradeCheckedList: { id: string; status: CheckedType }[]) => void;
} => {
  const {
    hasError: errorFetchKanjiList,
    isLoaded: isKanjiListLoaded,
    kanjiList,
  } = useFetchKanjiList();

  const [statusList, setStatusList] = useState<
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
      setStatusList((prev) => {
        const newGrade = gradeCheckedList.map((x) => ({
          id: x.id,
          grade,
          status: x.status,
        }));
        const checked = [...prev.filter((x) => x.grade !== grade), ...newGrade];

        const tmp = kanjiList
          .map((k) => ({
            ji: k.ji,
            status:
              checked.find((c) => c.id === k.id)?.status ?? CheckedType.FALSE,
          }))
          .filter((l) => l.status !== CheckedType.FALSE);
        setSelectedKanji(tmp);

        return checked;
      });
    };

  return {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
    statusList,
    handleChange,
  };
};

export type { SelectedKanjiType };
export default useKanjiSelector;
