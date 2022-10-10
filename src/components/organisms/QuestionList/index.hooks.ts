import React, { useEffect, useState } from 'react';
import useFetchQuestionList from '../../../hooks/useFetchQuestionList.hooks';

const useQuestionList = (
  must: string[],
  usable: string[],
  max: number,
): {
  hasError: Error | null;
  isLoaded: boolean;
  list: (string | string[])[][];
  canCheckAnswer: boolean;
  setCanCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const { hasError, isLoaded, questionList } = useFetchQuestionList();
  const [canCheckAnswer, setCanCheckAnswer] = useState(false);

  useEffect(() => {
    setCanCheckAnswer(false);
  }, [must, usable]);

  const list = questionList
    .filter((q) =>
      q.some((word) => {
        if (word.t === 'kanji') {
          const [ji, _] = word.v;

          return must.includes(ji);
        }

        return false;
      }),
    )
    .map((q) =>
      q.map((word) => {
        if (word.t === 'kana') {
          return word.v;
        }
        const [ji, yomi] = word.v;

        return [...must, ...usable].some((t) => ji.includes(t))
          ? [ji, yomi]
          : yomi;
      }),
    )
    .sort(() => 0.5 - Math.random()) // シャッフル
    .slice(0, max);

  return {
    hasError,
    isLoaded,
    list,
    canCheckAnswer,
    setCanCheckAnswer,
  };
};

export default useQuestionList;
