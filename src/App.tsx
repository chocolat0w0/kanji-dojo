import React, { useState, VFC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Select from 'components/pages/Select';
import Count from 'components/pages/Count';
import { SelectedKanjiType, SelectedStatusType } from 'data/SelectedKanjiType';
import Question from 'components/pages/Question';

const App: VFC = () => {
  const [statusList, setStatusList] = useState<SelectedStatusType[]>([]);

  const [selectedKanjiList, setSelectedKanjiList] = useState<
    SelectedKanjiType[]
  >([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Select
            statusList={statusList}
            setStatusList={setStatusList}
            setSelectedKanjiList={setSelectedKanjiList}
          />
        }
      />
      <Route path="count" element={<Count />} />

      <Route
        path="question"
        element={<Question selectedKanjiList={selectedKanjiList} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
