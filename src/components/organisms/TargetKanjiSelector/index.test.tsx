import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import server from 'mocks/server';
import { rest } from 'msw';
import KanjiCheckList from './index';

test('漢字リストjsonが返却されなかったらエラーが表示される', async () => {
  const setCheckedKanji = jest.fn();
  // handlersをエラーで上書き
  server.use(
    rest.get(
      `${process.env.PUBLIC_URL}/assets/json/kanji_list.json`,
      (req, res, ctx) => res(ctx.text('error')),
    ),
  );

  render(
    <KanjiCheckList
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setCheckedKanji={setCheckedKanji}
    />,
  );
  expect(await screen.findByText(/Error.*/)).toBeInTheDocument();
});

test('漢字リストがチェックされたらイベントハンドラが呼ばれる', async () => {
  const setCheckedKanji = jest.fn();

  render(
    <KanjiCheckList
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setCheckedKanji={setCheckedKanji}
    />,
  );
  fireEvent.click(await screen.findByLabelText('一'));
  expect(setCheckedKanji).toBeCalledWith(['一']);
});
