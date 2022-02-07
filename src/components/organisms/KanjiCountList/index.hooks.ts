import KanjiType from 'data/KanjiListType';
import useFetchKanjiList from '../../hooks/useFetchKanjiList.hooks';

const useKanjiCountList = (): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  countExam: (ji: string) => number;
} => {
  const { errorFetchKanjiList, isKanjiListLoaded, kanjiList } =
    useFetchKanjiList();

  const countExam = (ji: string): number => ji.length;
  // TODO: 問題文ファイルの取得方法をfetchに変更する
  // TODO: 問題文ファイルを読み込んで、漢字の出現数を数える

  return {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
    countExam,
  };
};

export default useKanjiCountList;
