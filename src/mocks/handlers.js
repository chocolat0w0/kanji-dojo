// src/mocks/handlers.js
import { rest } from 'msw';

// モックのリクエストとレスポンスの指定
const handlers = [
  rest.get(
    `${process.env.PUBLIC_URL}/assets/json/kanji_list.json`,
    (req, res, ctx) =>
      res(
        // json形式で返却
        ctx.json([
          {
            id: '1-1',
            ji: '一',
            kun: ['イチ', 'イツ'],
            on: [
              {
                yomi: 'ひと',
              },
              {
                yomi: 'ひと',
                okuri: 'つ',
              },
            ],
            grade: 1,
          },
        ]),
      ),
  ),
];

export default handlers;
