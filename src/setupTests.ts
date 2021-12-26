// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Server
import server from './mocks/server';

// モックサーバのlistenをすべてのテストの前に一回だけ行う
beforeAll(() => server.listen());

// 他のテストに影響を与えないようにテストごとにhandlersをリセットする
afterEach(() => server.resetHandlers());

// すべてのテストが終了したらモックサーバをcloseする
afterAll(() => server.close());
