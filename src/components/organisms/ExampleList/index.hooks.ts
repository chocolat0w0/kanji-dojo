import React, { useEffect, useState } from 'react';
import useFetchExampleList from '../../hooks/useFetchExampleList.hooks';

const useExampleList = (
  targetList: string[],
): {
  errorFetchExampleList: Error | null;
  isExampleListLoaded: boolean;
  list: (string | string[])[][];
  canCheckAnswer: boolean;
  setCanCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const { errorFetchExampleList, isExampleListLoaded, exampleList } =
    useFetchExampleList();
  const [canCheckAnswer, setCanCheckAnswer] = useState(false);

  useEffect(() => {
    setCanCheckAnswer(false);
  }, [targetList]);

  const list = exampleList
    .map((e) =>
      e.map((x) => {
        if (x.t === 'kana') {
          return x.v;
        }
        const [ji, yomi] = x.v;

        return targetList.filter((t) => ji.includes(t)).length
          ? [ji, yomi]
          : yomi;
      }),
    )
    .filter((e) => e.find((x) => typeof x !== 'string'));

  return {
    errorFetchExampleList,
    isExampleListLoaded,
    list,
    canCheckAnswer,
    setCanCheckAnswer,
  };
};

export default useExampleList;
