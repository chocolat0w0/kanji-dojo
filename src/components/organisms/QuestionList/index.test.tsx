import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionList from './index';

test('漢字が含まれる問題文が表示される', async () => {
  render(<QuestionList must={['一']} usable={[]} max={10} />);
  const list = await screen.findAllByRole('listitem');
  expect(
    list.some((l) => /はなが.*一つ.*(.*ひとつ.*).*さいた/.test(l.innerHTML)),
  ).toBeTruthy();
});

test('回答表示モードにすると答えが表示される', async () => {
  render(<QuestionList must={['一']} usable={[]} max={10} />);
  // 回答表示ボタンをクリック
  userEvent.click(await screen.findByRole('button'));
  expect(screen.getByRole('list')).toHaveClass('show-answer');
});
