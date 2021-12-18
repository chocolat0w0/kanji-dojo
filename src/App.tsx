import React, { useState, VFC } from 'react';
import ExampleList from 'components/ExampleList';
import { kanjiList } from './data/KanjiList';
import CheckList from './components/CheckList';
import './App.css';

const App: VFC = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
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
              <h1>{grade}年の漢字</h1>
              <CheckList
                list={kanjiList.filter((k) => k.grade === grade)}
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
