import { EventEmitter } from '../events';
import MessageTypes from './constants/message-types';
import { v4 as uuid } from 'uuid';
import * as PayloadTypes from './constants/payloads/';
import DisconnectReason from './constants/disconnect-reason';

class WebSocketError extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
  }
}

const ERRORS = {
  NOT_CONNECTED: new WebSocketError(4000, 'Socket is not connected.'),
  INVALID_PAYLOAD: new WebSocketError(4001, 'Invalid payload.'),
  INVALID_RESPONSE: new WebSocketError(4002, 'Invalid response.'),
  REQUEST_TIMEOUT: new WebSocketError(4003, 'Request timeout.')
};

const ConnectionEvents = {
  EVENT: 'event',
  REQUEST: 'request',
  RESPONSE: 'response',
  PING: 'ping',
  MESSAGE: 'message',
  CLOSE: 'close'
};

class Connection extends EventEmitter {
  /**
   * @param {WebSocketInterface} socket
   */
  constructor(socket) {
    super();

    // throw error if socket is not connected
    if (socket.readyState !== 1) throw ERRORS.NOT_CONNECTED;

    this.socket = socket;
    this.socket.onclose = () =>
      this.emit('close', DisconnectReason.ABNORMAL, this);
    this.socket.onmessage = msg => this.onMessage(msg.data || msg);
  }

  get connected() {
    return this.socket.readyState === 1;
  }

  /**
   * @private
   * @param {string} msg
   */
  onMessage(msg) {
    /** @type {WebSocketMessage} */
    const data = JSON.parse(msg);

    switch (data.type) {
      case MessageTypes.EVENT:
        this.emit(ConnectionEvents.EVENT, data.payload, this);
        break;

      case MessageTypes.REQUEST:
        this.onRequest(data);
        break;

      case MessageTypes.RESPONSE:
        this.emit(ConnectionEvents.RESPONSE, data, this);
        break;

      default:
        this.emit(ConnectionEvents.MESSAGE, data, this);
        break;
    }
  }

  /**
   * @private
   * @param {WebSocketMessage} msg
   */
  onRequest(msg) {
    const { payload } = msg;

    const res = payload => {
      this.send(
        JSON.stringify({ type: MessageTypes.RESPONSE, id: msg.id, payload })
      );
    };

    switch (payload.type) {
      case PayloadTypes.GENERAL.PING:
        res({ type: PayloadTypes.GENERAL.PONG });
        this.emit('ping', this);
        break;

      case PayloadTypes.GENERAL.DISCONNECT:
        // send a success response
        res({ success: true });

        // close the socket
        this.socket.onclose = () => {
          this.dispose();
          this.emit('close', DisconnectReason.REQUESTED, this);
        };

        this.socket.close();
        break;

      default:
        this.emit('request', payload, res, this);
        break;
    }
  }

  /**
   * Send a raw message to the other client.
   * @param {string} msg
   */
  send(msg) {
    if (!this.connected) throw ERRORS.NOT_CONNECTED;

    this.socket.send(msg);
  }

  /**
   * Send a event to the other client.
   * @param {MessagePayload} payload
   */
  sendEvent(payload) {
    this.send(JSON.stringify({ type: MessageTypes.EVENT, payload }));
  }

  /**
   * Send a request to the other client.
   * @param {MessagePayload} payload
   * @param {number} [timeout=30000]
   */
  sendRequest(payload, timeout = 30000) {
    return new Promise((resolve, reject) => {
      if (!this.connected) return reject(ERRORS.NOT_CONNECTED);

      const id = uuid();

      // used to check if the request is timeout.
      const timer = setTimeout(() => {
        this.off('response', onResponse);
        clearTimeout(timer);
        return reject(ERRORS.REQUEST_TIMEOUT);
      }, timeout);

      const onResponse = msg => {
        if (msg.id !== id && msg.type !== MessageTypes.RESPONSE) return;

        // clear resources.
        clearTimeout(timer);
        this.off('response', onResponse);

        resolve(msg.payload);
      };

      this.on('response', onResponse);

      this.send(JSON.stringify({ type: MessageTypes.REQUEST, id, payload }));
    });
  }

  /**
   * Send a ping to the other client.
   * @param {number} [timeout=3000]
   * @returns {Promise<void>}
   */
  async ping(timeout = 3000) {
    return await this.sendRequest({ type: PayloadTypes.GENERAL.PING }, timeout);
  }

  /**
   * Disposing the connection.
   */
  dispose() {
    if (!this.socket) return;

    this.socket.onclose = null;
    this.socket.onmessage = null;
    this.socket = null;
  }

  /**
   * Close the connection. Same as disconnect().
   * @param {number} [timeout=3000]
   * @returns {Promise<void>}
   */
  async close(timeout = 3000) {
    await this.disconnect(timeout);
  }

  /**
   * Send a disconnect request to the other client.
   * @param {number} [timeout=3000]
   * @returns {Promise<void>}
   */
  disconnect(timeout = 3000) {
    return new Promise(async resolve => {
      if (!this.connected) {
        this.dispose();
        return resolve();
      }

      // send to the other client to request a disconnection
      await this.sendRequest(
        { type: PayloadTypes.GENERAL.DISCONNECT },
        timeout
      );

      this.socket.onclose = () => {
        this.dispose();
        resolve();
        this.emit('close', DisconnectReason.NORMAL, this);
      };

      this.socket.close();
    });
  }
}

export { ConnectionEvents, Connection as default };
