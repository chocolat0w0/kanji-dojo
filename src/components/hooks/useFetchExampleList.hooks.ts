import { useEffect, useState } from 'react';
import { ExampleType } from 'data/ExampleListType';

const useFetchExampleList = (): {
  errorFetchExampleList: Error | null;
  isExampleListLoaded: boolean;
  exampleList: ExampleType[];
} => {
  const [isExampleListLoaded, setIsExampleListLoaded] = useState(false);
  const [exampleList, setExampleList] = useState<ExampleType[]>([]);
  const [errorFetchExampleList, setErrorFetchExampleList] =
    useState<Error | null>(null);

  // AJAX と API：https://ja.reactjs.org/docs/faq-ajax.html
  useEffect(() => {
    // mount状態か確認する
    let isMounted = true;

    fetch(`${process.env.PUBLIC_URL}/assets/json/exam_list.json`)
      .then((res) => res.json())
      .then(
        (result: ExampleType[]) => {
          if (isMounted) {
            setIsExampleListLoaded(() => true);
            setExampleList(() => result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          if (isMounted) {
            setIsExampleListLoaded(() => true);
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
    errorFetchExampleList,
    isExampleListLoaded,
    exampleList,
  };
};

export default useFetchExampleList;
