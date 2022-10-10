import KanjiType from 'data/KanjiListType';
import useFetchKanjiList from '../../../hooks/useFetchKanjiList.hooks';
import useFetchQuestionList from '../../../hooks/useFetchQuestionList.hooks';

const useKanjiCounter = (): {
  errorFetch: Error | null;
  isLoaded: boolean;
  kanjiList: KanjiType[];
  countExam: (ji: string) => number;
} => {
  const {
    hasError: errorFetchKanjiList,
    isLoaded: isKanjiListLoaded,
    kanjiList,
  } = useFetchKanjiList();

  const {
    hasError: errorFetchQuestionList,
    isLoaded: isQuestionListLoaded,
    questionList,
  } = useFetchQuestionList();

  const countExam = (ji: string): number =>
    questionList.filter(
      (l) =>
        l
          .filter((v) => v.t === 'kanji')
          .map((v) => v.v[0])
          .filter((v) => v.includes(ji)).length,
    ).length;

  const errorFetch = errorFetchKanjiList && errorFetchQuestionList;
  const isLoaded = isKanjiListLoaded && isQuestionListLoaded;

  return {
    errorFetch,
    isLoaded,
    kanjiList,
    countExam,
  };
};

export default useKanjiCounter;
