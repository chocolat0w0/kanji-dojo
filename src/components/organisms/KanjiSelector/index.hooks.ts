import { CheckedType } from 'components/atoms/ThreeStatusCheckBox';
import KanjiType from 'data/KanjiListType';
import { SelectedKanjiType, SelectedStatusType } from 'data/SelectedKanjiType';
import useFetchKanjiList from '../../../hooks/useFetchKanjiList.hooks';

const useKanjiSelector = (
  setStatusList: React.Dispatch<React.SetStateAction<SelectedStatusType[]>>,
  setSelectedKanji: React.Dispatch<React.SetStateAction<SelectedKanjiType[]>>,
): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  handleChange: (
    grade: number,
  ) => (gradeCheckedList: { id: string; status: CheckedType }[]) => void;
} => {
  const {
    hasError: errorFetchKanjiList,
    isLoaded: isKanjiListLoaded,
    kanjiList,
  } = useFetchKanjiList();

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
    handleChange,
  };
};

export default useKanjiSelector;
