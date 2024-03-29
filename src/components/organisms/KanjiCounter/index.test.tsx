import React from 'react';
import { render, screen } from '@testing-library/react';
import KanjiCounter from './index';

test('漢字が含まれる問題文の数が表示される', async () => {
  render(<KanjiCounter />);
  expect(await screen.findByText('一(1)')).toBeInTheDocument();
  expect(await screen.findByText('花(2)')).toBeInTheDocument();
  expect(await screen.findByText('右(0)')).toBeInTheDocument();
});
