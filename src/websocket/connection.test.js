import { WebSocket } from 'ws';
import http from 'http';
import WebSocketServer from '@/websocket/server';
import WebSocketConnection, { ConnectionEvents } from '@/websocket/connection';
import assert from 'assert';

const PORT = 8837;

const createSocket = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://localhost:${PORT}/test`);
    ws.onopen = () => resolve(new WebSocketConnection(ws));
    ws.onerror = err => reject(err);
  });
};

describe('websocket/connection.js', () => {
  const httpServer = http.createServer();
  const websocketServer = new WebSocketServer({
    server: httpServer,
    path: '/test'
  });

  before(done => {
    websocketServer.on('connection', socket => {
      // echo
      socket.on(ConnectionEvents.EVENT, data => socket.sendEvent(data));
      socket.on(ConnectionEvents.REQUEST, (data, response) => {
        assert(data.foo === 'bar');
        response({ success: true });
      });
    });

    websocketServer.listen();
    httpServer.listen(PORT, () => {
      done();
    });
  });

  it('should send and receive an event', done => {
    createSocket()
      .then(socket => {
        socket.once(ConnectionEvents.EVENT, async data => {
          assert(data.foo === 'bar');
          await socket.close();
          done();
        });

        socket.sendEvent({ foo: 'bar' });
      })
      .catch(done);
  });

  it('ping() should be successful', done => {
    createSocket()
      .then(async socket => {
        await socket.ping();
        await socket.close();
        done();
      })
      .catch(done);
  });

  it('sendRequest() should receive a response', done => {
    createSocket()
      .then(async socket => {
        const response = await socket.sendRequest({ foo: 'bar' });
        assert(response.success);
        await socket.close();
        done();
      })
      .catch(done);
  });

  after(done => {
    websocketServer.dispose();
    httpServer.close(() => done());
  });
});
