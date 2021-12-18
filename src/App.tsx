import React, { useState, VFC } from 'react';
import ExampleList from 'components/ExampleList';
import GradeCheckBox from 'components/GradeCheckBox';
import { kanjiList } from './data/KanjiList';
import KanjiCheckList from './components/KanjiCheckList';
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
      <header className="App-header">漢字道場</header>
      <main>
        {/* 漢字を学習年別に表示 */}
        <h1>漢字リスト</h1>
        {[...Array(6).keys()]
          .map((i) => i + 1)
          .map((grade) => (
            <section key={`grade${grade}`}>
              <h1>
                <GradeCheckBox
                  id={`grade-${grade}`}
                  name="grade"
                  label={`${grade}年の漢字`}
                  handleChange={handleGradeChange}
                />
              </h1>
              <KanjiCheckList
                list={kanjiList.filter((k) => k.grade === grade)}
                checkedList={checkedList}
                handleChange={handleChange}
              />
            </section>
          ))}
        {/* 学習対象にした漢字を表示 */}
        <h1>選んだ漢字</h1>
        {checkedKanjiList.join(' ')}

        {/* 学習対象の漢字の問題文を表示 */}
        <h1>問題文</h1>
        <ExampleList targetList={checkedKanjiList} />
      </main>
    </div>
  );
};

export default App;
