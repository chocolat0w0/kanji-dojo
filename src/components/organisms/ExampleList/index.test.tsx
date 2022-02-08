import React from 'react';
import { render, screen } from '@testing-library/react';
import ExampleList from './index';

test('漢字が含まれる問題文が表示される', async () => {
  render(<ExampleList targetList={['一']} />);
  // 問題文（空欄部分がテキストだとどう表示されたことになるか）
  expect(
    await screen.findByText('はなが一つ(ひとつ)さいた'),
  ).toBeInTheDocument();
});

test('回答表示モードにすると答えが表示される', async () => {
  render(<ExampleList targetList={['一']} />);
  // 回答表示ボタンをクリック
  // 問題文（表示同じになってしまう？スタイルは確認できるか）
  expect(
    await screen.findByText('はなが一つ(ひとつ)さいた'),
  ).toBeInTheDocument();
});
