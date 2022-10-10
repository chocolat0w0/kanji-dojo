import React, { useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Select from 'components/pages/Select';
import Count from 'components/pages/Count';

const App: VFC = () => {
  const [isCountMode, setIsCountMode] = useState(false);

  // カウントモードは仮実装で、?count=1 クエリを URL に追加したらなる
  const location = useLocation();
  useEffect(
    () => setIsCountMode(location.search.includes('count=1')),
    [location],
  );

  return <div className="App">{isCountMode ? <Count /> : <Select />}</div>;
};

export default App;
