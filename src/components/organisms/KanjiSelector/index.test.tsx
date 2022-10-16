import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import server from 'mocks/server';
import { rest } from 'msw';
import KanjiSelector from './index';

test('漢字リストjsonが返却されなかったらエラーが表示される', async () => {
  const setSelectedKanji = jest.fn();
  // handlersをエラーで上書き
  server.use(
    rest.get(
      `${process.env.PUBLIC_URL}/assets/json/kanji_list.json`,
      (req, res, ctx) => res(ctx.text('error')),
    ),
  );

  render(
    <KanjiSelector
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      statusList={[]}
      setStatusList={() => []}
      setSelectedKanji={setSelectedKanji}
    />,
  );
  expect(await screen.findByText(/Error.*/)).toBeInTheDocument();
});

test('漢字リストがチェックされたらイベントハンドラが呼ばれる', async () => {
  const setSelectedKanji = jest.fn();

  render(
    <KanjiSelector
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      statusList={[]}
      setStatusList={() => []}
      setSelectedKanji={setSelectedKanji}
    />,
  );
  fireEvent.click(await screen.findByLabelText('一'));
  expect(setSelectedKanji).toBeCalledWith(['一']);
});
