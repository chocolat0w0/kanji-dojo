import React, { useCallback, useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Select from 'components/pages/Select';
import Count from 'components/pages/Count';
import { SelectedKanjiType, SelectedStatusType } from 'data/SelectedKanjiType';
import Question from 'components/pages/Question';

type Mode = 'select' | 'count' | 'question' | 'answer';

const App: VFC = () => {
  const [mode, setMode] = useState<Mode>('select');
  const [statusList, setStatusList] = useState<SelectedStatusType[]>([]);

  const [selectedKanjiList, setSelectedKanjiList] = useState<
    SelectedKanjiType[]
  >([]);

  // カウントモードは仮実装で、?count=1 クエリを URL に追加したらなる
  const location = useLocation();
  useEffect(() => {
    if (mode === 'select' && location.search.includes('count=1'))
      setMode('count');
  }, [location, mode]);

  const changeNextMode = useCallback(() => {
    if (mode === 'select') {
      setMode('question');
    }
  }, [mode]);
  const changePrevMode = useCallback(() => {
    if (mode === 'question') {
      setMode('select');
    }
  }, [mode]);

  const getComponent = useCallback(
    (m: Mode): JSX.Element => {
      switch (m) {
        case 'select':
          return (
            <Select
              statusList={statusList}
              setStatusList={setStatusList}
              setSelectedKanjiList={setSelectedKanjiList}
              changeNextMode={changeNextMode}
            />
          );

        case 'count':
          return <Count />;

        case 'question':
          return (
            <Question
              selectedKanjiList={selectedKanjiList}
              changePrevMode={changePrevMode}
            />
          );

        default:
          return <p>エラー</p>;
      }
    },
    [changeNextMode, changePrevMode, selectedKanjiList, statusList],
  );

  return <div className="App">{getComponent(mode)}</div>;
};

export default App;
