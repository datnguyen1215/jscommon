import websocket, {
  WebSocketServer,
  WebSocketConnection,
  ConnectionEvents
} from '.';
import assert from 'assert';

describe('websocket/index.js', () => {
  it('should expose websocket object', () => {
    assert(websocket, 'websocket object is not defined');
  });

  it('should expose websocket.WebSocketServer class', () => {
    assert(
      websocket.WebSocketServer,
      'websocket.WebSocketServer class is not defined'
    );
    assert(WebSocketServer, 'WebSocketServer class is not defined');
  });

  it('should expose websocket.WebSocketConnection class', () => {
    assert(
      websocket.WebSocketConnection,
      'websocket.WebSocketConnection class is not defined'
    );
    assert(WebSocketConnection, 'WebSocketConnection class is not defined');
  });

  it('should expose websocket.ConnectionEvents object', () => {
    assert(
      websocket.ConnectionEvents,
      'websocket.ConnectionEvents object is not defined'
    );
    assert(ConnectionEvents, 'ConnectionEvents object is not defined');
  });
});
