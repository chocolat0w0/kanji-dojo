import KanjiType from 'data/KanjiListType';
import { useEffect, useState } from 'react';

const useKanjiCheckList = (
  setCheckedKanji: (list: string[]) => void,
): {
  errorFetchKanjiList: Error | null;
  isKanjiListLoaded: boolean;
  kanjiList: KanjiType[];
  checkedList: { grade: number; checkedIds: string[] }[];
  handleChange: (grade: number) => (checkedIds: string[]) => void;
} => {
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
    checkedList,
    handleChange,
  };
};

export default useKanjiCheckList;
