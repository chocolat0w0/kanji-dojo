import React, { useState, VFC } from 'react';
import ExampleList from 'components/organisms/ExampleList';
import { Box, Typography } from '@material-ui/core';
import { kanjiList } from './data/KanjiList';
import GradeCheckList from './components/organisms/GradeCheckList';
import './App.css';

const App: VFC = () => {
  const [checkedList, setCheckedList] = useState<
    { grade: number; checkedIds: string[] }[]
  >(
    [...Array(6).keys()]
      .map((i) => i + 1)
      .map((grade) => ({ grade, checkedIds: [] })),
  );

  const handleChange = (grade: number, checkedIds: string[]) => {
    setCheckedList((l) => [
      ...l.filter((x) => x.grade !== grade),
      { grade, checkedIds },
    ]);
  };

  // TODO:checkedListが変わった時に変更する
  const checkedKanjiList = kanjiList
    .filter((l) =>
      checkedList
        .map((x) => x.checkedIds)
        .flat()
        .includes(l.id),
    )
    .map((l) => l.ji);

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
          {/* TODO: organisms に分離 */}
          {[...Array(6).keys()]
            .map((i) => i + 1)
            .map((grade) => {
              const gradeList = kanjiList.filter((k) => k.grade === grade);

              return (
                <GradeCheckList
                  key={`grade-${grade}`}
                  grade={grade}
                  list={gradeList}
                  checkedList={
                    checkedList.find((l) => l.grade === grade)?.checkedIds || []
                  }
                  handleChange={handleChange}
                />
              );
            })}
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
