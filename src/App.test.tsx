import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('初期表示：漢字リストが表示され、問題文に何も表示されない', async () => {
  render(
    <Router>
      <App />
    </Router>,
  );

  // await の場合は get〜 ではなく find〜
  // https://testing-library.com/docs/dom-testing-library/api-async/
  const kanjiItem = await screen.findByText('1年の漢字');
  expect(kanjiItem.closest('section')?.querySelectorAll('input').length).toBe(
    4,
  );
  expect(screen.queryByLabelText('一')).toBeInTheDocument();
  expect(screen.queryByLabelText('二')).not.toBeInTheDocument();
  const examItem = screen.getByText('問題文');
  expect(examItem.closest('section')?.querySelectorAll('li').length).toBe(0);
});

test('「一」を選んだら問題文に「一」を含む問題が表示される', async () => {
  render(
    <Router>
      <App />
    </Router>,
  );

  fireEvent.click(await screen.findByLabelText('一'));
  expect((await screen.findByText(/はな.*/)).textContent).toBe(
    'はなが一つ(ひとつ)さいた',
  );
});
