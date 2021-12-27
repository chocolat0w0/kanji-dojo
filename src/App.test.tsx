import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('初期表示：漢字リストが表示され、問題文に何も表示されない', async () => {
  render(<App />);

  // await の場合は get〜 ではなく find〜
  // https://testing-library.com/docs/dom-testing-library/api-async/
  const kanjiItem = await screen.findByText('漢字リスト');
  expect(kanjiItem.closest('section')?.querySelectorAll('input').length).toBe(
    7,
  );
  expect(screen.getByLabelText('一')).toBeInTheDocument();
  const examItem = screen.getByText('問題文');
  expect(examItem.closest('section')?.querySelectorAll('li').length).toBe(0);
});

test('「一」を選んだら問題文に「一」を含む問題が表示される', async () => {
  render(<App />);

  fireEvent.click(await screen.findByLabelText('一'));
  expect(screen.getByText(/はな.*/).textContent).toBe(
    'はなが一つ(ひとつ)さいた。',
  );
});
