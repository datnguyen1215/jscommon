/**
 * @typedef {Object} WebSocketServerConfig
 * @property {number|string} port
 * @property {string} path
 * @property {http.Server} server
 */
import { EventEmitter } from '../events';
import { WebSocketServer } from 'ws';
import { Connection, ConnectionEvents } from './connection';

class Server extends EventEmitter {
  /**
   * @param {WebSocketServerConfig} config
   */
  constructor(config) {
    super();

    /** @private */
    this.config = config;

    /**
     * @type {ws.Server}
     * @private
     **/
    this.wss = null;

    /**
     * @type {Connection}
     * @private
     **/
    this.clients = [];

    /** @private */
    this.disposers = [];
  }

  /**
   * Broadcast a message to all connected clients.
   * @param {any} msg
   */
  broadcastEvent(msg) {
    this.clients.forEach(client => client.sendEvent(msg));
  }

  /**
   * Broadcast a request to all connected clients.
   * @param {any} msg
   * @returns {Promise}
   */
  broadcastRequest(msg) {
    return Promise.all(this.clients.map(client => client.sendRequest(msg)));
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
      socket.once(ConnectionEvents.CLOSE, () => {
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
    this.wss = null;
    this.disposers = [];
    this.clients = [];
  }
}

export { Server as default };
