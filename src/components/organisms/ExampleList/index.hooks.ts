import exampleList from 'data/ExampleList';
import React, { useEffect, useState } from 'react';

const useExampleList = (
  targetList: string[],
): {
  canCheckAnswer: boolean;
  setCanCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  list: (string | string[])[][];
} => {
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
    canCheckAnswer,
    setCanCheckAnswer,
    list,
  };
};

export default useExampleList;
