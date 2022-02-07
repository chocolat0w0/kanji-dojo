import { useEffect, useState } from 'react';
import KanjiType from 'data/KanjiListType';

const useFetchKanjiList = (): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
} => {
  const [isKanjiListLoaded, setIsKanjiListLoaded] = useState(false);
  const [kanjiList, setKanjiList] = useState<KanjiType[]>([]);
  const [errorFetchKanjiList, setErrorFetchKanjiList] = useState<Error | null>(
    null,
  );

  // AJAX と API：https://ja.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    // mount状態か確認する
    let isMounted = true;

    fetch(`${process.env.PUBLIC_URL}/assets/json/kanji_list.json`)
      .then((res) => res.json())
      .then(
        (result: KanjiType[]) => {
          if (isMounted) {
            setIsKanjiListLoaded(() => true);
            setKanjiList(() => result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          if (isMounted) {
            setIsKanjiListLoaded(() => true);
            setErrorFetchKanjiList(() => error);
          }
        },
      );

    return () => {
      // 途中でunmountされたらfetch後の操作をさせない
      isMounted = false;
    };
  }, []);

  return {
    errorFetchKanjiList,
    isKanjiListLoaded,
    kanjiList,
  };
};

export default useFetchKanjiList;
