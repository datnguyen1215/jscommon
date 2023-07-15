/**
 * @typedef {Object} Writable
 * @property {function(any): void} set
 * @property {function(any): void} update
 * @property {function(function(any): void): any} subscribe
 */

/**
 * @typedef {Object} MessagePayload
 * @property {string} type
 * @property {Object} [data]
 */

/**
 * @typedef {Object} WebSocketMessage
 * @property {string} type
 * @property {string} [id]
 * @property {MessagePayload} [payload]
 */

/**
 * @typedef {import('ws').WebSocket | WebSocket} WebSocketInterface
 */
