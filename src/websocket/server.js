/**
 * @typedef {Object} WebSocketServerConfig
 * @property {http.Server} server
 * @property {string} path
 */
import { EventEmitter } from '../events';
import { WebSocketServer } from 'ws';
import Connection from './connection';

export default class Server extends EventEmitter {
  /**
   * @param {WebSocketServerConfig} config
   */
  constructor(config) {
    super();

    this.config = config;

    /** @type {ws.Server} */
    this.wss = null;

    /** @type {ws.WebSocket[]} */
    this.clients = [];

    this.disposers = [];
  }

  /**
   * Start listening to websocket connections.
   * @returns {Promise}
   */
  listen() {
    this.wss = new WebSocketServer(this.config);

    const onConnection = ws => {
      const socket = new Connection(ws);

      // Listen to disconnection
      socket.once('close', () => {
        this.clients = this.clients.filter(client => client !== socket);
      });

      this.clients.push(socket);

      this.emit('connection', socket);
    };

    this.wss.on('connection', onConnection);

    this.disposers.push(() => {
      this.wss.off('connection', onConnection);
    });
  }

  /**
   * Stop listening to websocket connections.
   * @returns {Promise}
   */
  async dispose() {
    await this.wss.close();
    this.disposers.forEach(dispose => dispose());
    this.clients.forEach(client => client.close());
    this.clients = [];
  }
}
