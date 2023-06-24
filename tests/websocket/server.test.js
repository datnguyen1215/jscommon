import { WebSocket } from 'ws';
import http from 'http';
import WebSocketServer from '#src/websocket/server';

const createServer = config => {
  const httpServer = http.createServer();
  const server = new WebSocketServer({
    server: httpServer,
    path: config.path
  });
  httpServer.listen(config.port);
  server.listen();
  return { websocketServer: server, httpServer };
};

describe('websocket/server.js', () => {
  const PORT = 8837;

  it(`should listen to port ${PORT}`, done => {
    const { websocketServer: server, httpServer } = createServer({
      port: PORT
    });

    server.on('connection', socket => {
      socket.close();
      server.dispose();
      httpServer.close(err => {
        if (err) return done(err);
        done();
      });
    });

    // try to make a connection
    const ws = new WebSocket(`ws://localhost:${PORT}`);
    ws.onopen = () => {
      ws.close();
    };
  });

  it('should listen to specific path', done => {
    const { websocketServer: server, httpServer } = createServer({
      port: PORT,
      path: '/test'
    });

    server.on('connection', socket => {
      socket.close();
      server.dispose();
      httpServer.close(err => {
        if (err) return done(err);
        done();
      });
    });

    // try to make a connection
    const ws = new WebSocket(`ws://localhost:${PORT}/test`);
    ws.onopen = () => {
      ws.close();
    };
  });

  it('should create websocket server without http', done => {
    const server = new WebSocketServer({ port: PORT });
    server.on('connection', socket => {
      socket.close();
      server.dispose();
      done();
    });
    server.listen();

    const ws = new WebSocket(`ws://localhost:${PORT}`);
    ws.onopen = () => {
      ws.close();
    };
  });
});
