import React, { useState, VFC } from 'react';
import ExampleList from 'components/organisms/ExampleList';
import { Box, Typography } from '@material-ui/core';
import { kanjiList } from './data/KanjiList';
import KanjiCheckList from './components/organisms/KanjiCheckList';
import './App.css';

const App: VFC = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleGradeChange = (id: string, isChecked: boolean) => {
    const gradeKanjiList = kanjiList
      .filter((k) => k.grade.toString() === id.split('grade-')[1])
      .map((k) => k.id);

    setCheckedList((l) =>
      isChecked
        ? [...new Set([...l, ...gradeKanjiList])]
        : l.filter((i) => !gradeKanjiList.includes(i)),
    );
  };

  const handleChange = (id: string, isChecked: boolean) => {
    setCheckedList((l) => (isChecked ? [...l, id] : l.filter((i) => i !== id)));
  };

  const checkedKanjiList = kanjiList
    .filter((l) => checkedList.includes(l.id))
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
          {[...Array(6).keys()]
            .map((i) => i + 1)
            .map((grade) => {
              const gradeList = kanjiList.filter((k) => k.grade === grade);

              return (
                <KanjiCheckList
                  grade={grade}
                  list={gradeList}
                  checkedList={checkedList}
                  handleChange={handleChange}
                  handleGradeChange={handleGradeChange}
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
