import { useEffect, useState } from 'react';
import { QuestionType } from 'data/QuestionListType';

const useFetchQuestionList = (): {
  hasError: Error | null;
  isLoaded: boolean;
  questionList: QuestionType[];
} => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);
  const [hasError, setErrorFetchExampleList] = useState<Error | null>(null);

  // AJAX と API：https://ja.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    // mount状態か確認する
    let isMounted = true;

    fetch(`${process.env.PUBLIC_URL}/assets/json/exam_list.json`)
      .then((res) => res.json())
      .then(
        (result: QuestionType[]) => {
          if (isMounted) {
            setIsLoaded(() => true);
            setQuestionList(() => result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          if (isMounted) {
            setIsLoaded(() => true);
            setErrorFetchExampleList(() => error);
          }
        },
      );

    return () => {
      // 途中でunmountされたらfetch後の操作をさせない
      isMounted = false;
    };
  }, []);

  return {
    hasError,
    isLoaded,
    questionList,
  };
};

export default useFetchQuestionList;
