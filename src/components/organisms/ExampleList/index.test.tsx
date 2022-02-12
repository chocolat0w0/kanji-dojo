import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExampleList from './index';

test('漢字が含まれる問題文が表示される', async () => {
  render(<ExampleList targetList={['一']} />);
  const list = await screen.findAllByRole('listitem');
  expect(
    list.some((l) => /はなが.*一つ.*(.*ひとつ.*).*さいた/.test(l.innerHTML)),
  ).toBeTruthy();
});

test('回答表示モードにすると答えが表示される', async () => {
  render(<ExampleList targetList={['一']} />);
  // 回答表示ボタンをクリック
  userEvent.click(await screen.findByRole('button'));
  expect(screen.getByRole('list')).toHaveClass('show-answer');
});
