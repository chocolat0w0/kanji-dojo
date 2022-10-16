import React, { useCallback, useEffect, useState } from 'react';
import {
  QuestionType as QuestionSentence,
  KanaPart,
} from 'data/QuestionListType';
import useFetchQuestionList from '../../../hooks/useFetchQuestionList.hooks';

type QuestionWithId = {
  id: string;
  q: QuestionSentence;
};

const useQuestionList = (
  must: string[],
  usable: string[],
  max: number,
): {
  hasError: Error | null;
  isLoaded: boolean;
  list: QuestionWithId[];
  shuffle: () => void;
  canCheckAnswer: boolean;
  setCanCheckAnswer: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const { hasError, isLoaded, questionList } = useFetchQuestionList();
  const [canCheckAnswer, setCanCheckAnswer] = useState(false);

  const [questionListWithId, setQuestionListWithId] = useState<
    QuestionWithId[]
  >([]);
  const [filtered, setFiltered] = useState<QuestionWithId[]>([]);
  const [list, setList] = useState<QuestionWithId[]>([]);

  useEffect(() => {
    setQuestionListWithId(
      questionList.map((q, index) => ({
        id: index.toString(),
        q,
      })),
    );
  }, [questionList]);

  useEffect(() => {
    setCanCheckAnswer(false);
  }, [must, usable, max]);

  useEffect(() => {
    setFiltered(
      questionListWithId
        .filter((q) =>
          q.q.some((word) => {
            if (word.t === 'kanji') {
              const [ji, _] = word.v;

              return must.includes(ji);
            }

            return false;
          }),
        )
        .map((q) => {
          const question = q.q.map((word) => {
            if (word.t === 'kana') {
              return word;
            }
            const [ji, yomi] = word.v;

            return [...must, ...usable].some((t) => ji.includes(t))
              ? word
              : ({ t: 'kana', v: yomi } as KanaPart);
          });

          return { id: q.id, q: question };
        }),
    );
  }, [must, questionListWithId, usable]);

  useEffect(() => {
    setList(filtered.slice(0, max));
  }, [filtered, max]);

  const shuffle = useCallback(() => {
    setFiltered((prev) => [...prev].sort(() => 0.5 - Math.random()));
  }, []);

  return {
    hasError,
    isLoaded,
    list,
    shuffle,
    canCheckAnswer,
    setCanCheckAnswer,
  };
};

export default useQuestionList;
