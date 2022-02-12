import KanjiType from 'data/KanjiListType';
import useFetchKanjiList from '../../hooks/useFetchKanjiList.hooks';
import useFetchExampleList from '../../hooks/useFetchExampleList.hooks';

const useKanjiCountList = (): {
  errorFetch: Error | null;
  isLoaded: boolean;
  kanjiList: KanjiType[];
  countExam: (ji: string) => number;
} => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList } =
    useFetchKanjiList();

  const { errorFetchExampleList, isExampleListLoaded, exampleList } =
    useFetchExampleList();

  const countExam = (ji: string): number =>
    exampleList.filter(
      (l) =>
        l
          .filter((v) => v.t === 'kanji')
          .map((v) => v.v[0])
          .filter((v) => v.includes(ji)).length,
    ).length;

  const errorFetch = errorFetchKanjiList && errorFetchExampleList;
  const isLoaded = isKanjiListLoaded && isExampleListLoaded;

  return {
    errorFetch,
    isLoaded,
    kanjiList,
    countExam,
  };
};

export default useKanjiCountList;
