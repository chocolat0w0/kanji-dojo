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
            id: '1-0',
            ji: '一',
            kun: ['イチ', 'イツ'],
            on: ['ひと', 'ひと-つ'],
            grade: 1,
          },
          {
            id: '1-1',
            ji: '右',
            kun: ['ウ', 'ユウ'],
            on: ['みぎ'],
            grade: 1,
          },
          { id: '1-8', ji: '花', kun: ['カ'], on: ['はな'], grade: 1 },
        ]),
      ),
  ),
  rest.get(
    `${process.env.PUBLIC_URL}/assets/json/exam_list.json`,
    (req, res, ctx) =>
      res(
        // json形式で返却
        ctx.json([
          [
            { t: 'kanji', v: ['花', 'はな'] },
            { t: 'kana', v: 'が' },
            { t: 'kanji', v: ['一つ', 'ひとつ'] },
            { t: 'kanji', v: ['咲いた', 'さいた'] },
          ],
          [
            { t: 'kanji', v: ['花', 'はな'] },
            { t: 'kana', v: 'が' },
            { t: 'kanji', v: ['三つ', 'みっつ'] },
            { t: 'kanji', v: ['咲いた', 'さいた'] },
          ],
        ]),
      ),
  ),
];

export default handlers;
