import WebSocketServer from './server';
import {
  Connection as WebSocketConnection,
  ConnectionEvents
} from './connection';

const index = { WebSocketServer, WebSocketConnection, ConnectionEvents };

export {
  WebSocketServer,
  WebSocketConnection,
  ConnectionEvents,
  index as default
};
