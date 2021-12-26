import { setupServer } from 'msw/node';
import handlers from './handlers';

// handlersを元にモックサーバを作成
const server = setupServer(...handlers);

export default server;
