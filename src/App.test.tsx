import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders no exam', () => {
  render(<App />);

  expect(
    screen.getByText('問題文').closest('section')?.querySelectorAll('li')
      .length,
  ).toBe(0);
});
test('renders exam', () => {
  render(<App />);

  fireEvent.click(screen.getByLabelText('一'));
  expect(screen.getByText(/はな.*/).textContent).toBe(
    'はなが一つ(ひとつ)さいた。',
  );
});
