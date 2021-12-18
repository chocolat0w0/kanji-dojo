import React, { useState, VFC } from 'react';
import ExampleList from 'components/ExampleList';
import GradeCheckBox from 'components/GradeCheckBox';
import { kanjiList } from './data/KanjiList';
import KanjiCheckList from './components/KanjiCheckList';
import './App.css';

const App: VFC = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleChange = (id: string, isChecked: boolean) => {
    if (id.startsWith('grade-')) {
      const gradeKanjiList = kanjiList
        .filter((k) => k.grade.toString() === id.split('grade-')[1])
        .map((k) => k.id);
      if (isChecked) {
        setCheckedList((l) => [...new Set([...l, ...gradeKanjiList])]);
      } else {
        setCheckedList((l) => l.filter((i) => !gradeKanjiList.includes(i)));
      }
    } else if (isChecked) {
      setCheckedList((l) => [...l, id]);
    } else {
      setCheckedList((l) => l.filter((i) => i !== id));
    }
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
                  handleChange={handleChange}
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
