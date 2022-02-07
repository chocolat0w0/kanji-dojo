import React, { useEffect, useState, VFC } from 'react';
import { useLocation } from 'react-router-dom';
import ExampleList from 'components/organisms/ExampleList';
import { Box, Typography } from '@material-ui/core';
import KanjiList from './components/organisms/KanjiList';
import './App.css';

const App: VFC = () => {
  const [checkedKanjiList, setCheckedKanjiList] = useState<string[]>([]);
  const setCheckedKanji = (list: string[]) => {
    setCheckedKanjiList(() => list);
  };

  const [isCountMode, setIsCountMode] = useState(false);
  const location = useLocation();
  useEffect(
    () => setIsCountMode(location.search.includes('count=1')),
    [location],
  );
  console.log(isCountMode);

  return (
    <div className="App">
      <header className="App-header">
        <h1>漢字道場</h1>
      </header>
      <Box component="main" p="30px">
        {/* 漢字を学習年別に表示 */}
        <Box component="section">
          <Typography variant="h4" gutterBottom component="h1">
            漢字リスト
          </Typography>
          {/* {isCountMode ? (
            <div>Count Mode</div>
          ) : ( */}
          <KanjiList setCheckedKanji={setCheckedKanji} />
          {/* )} */}
        </Box>

        {/* 学習対象にした漢字を表示 (検証用、最後に削除) */}
        <section>
          <h1>選んだ漢字</h1>
          {checkedKanjiList.join(' ')}
        </section>

        {/* 学習対象の漢字の問題文を表示 */}
        <Box component="section" mt="30px">
          <Typography variant="h4" gutterBottom component="h1">
            問題文
          </Typography>
          <ExampleList targetList={checkedKanjiList} />
        </Box>
      </Box>
    </div>
  );
};

export default App;
