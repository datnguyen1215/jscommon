export const __esModule: boolean;
export default index;
export type MessagePayload = {
    type: string;
    data?: any;
};
export namespace ConnectionEvents {
    let EVENT: string;
    let REQUEST: string;
    let RESPONSE: string;
    let PING: string;
    let MESSAGE: string;
    let CLOSE: string;
}
declare class Connection extends events.EventEmitter {
    /**
     * @param {WebSocketInterface} socket
     */
    constructor(socket: WebSocketInterface);
    socket: WebSocketInterface;
    get connected(): boolean;
    /**
     * @private
     * @param {string} msg
     */
    private onMessage;
    /**
     * @private
     * @param {WebSocketMessage} msg
     */
    private onRequest;
    /**
     * Send a raw message to the other client.
     * @param {string} msg
     */
    send(msg: string): void;
    /**
     * Send a event to the other client.
     * @param {MessagePayload} payload
     */
    sendEvent(payload: MessagePayload): void;
    /**
     * Send a request to the other client.
     * @param {MessagePayload} payload
     * @param {number} [timeout=30000]
     */
    sendRequest(payload: MessagePayload, timeout?: number): Promise<any>;
    /**
     * Send a ping to the other client.
     * @param {number} [timeout=3000]
     * @returns {Promise<void>}
     */
    ping(timeout?: number): Promise<void>;
    /**
     * Disposing the connection.
     */
    dispose(): void;
    /**
     * Close the connection. Same as disconnect().
     * @param {number} [timeout=3000]
     * @returns {Promise<void>}
     */
    close(timeout?: number): Promise<void>;
    /**
     * Send a disconnect request to the other client.
     * @param {number} [timeout=3000]
     * @returns {Promise<void>}
     */
    disconnect(timeout?: number): Promise<void>;
}
declare class Server extends events.EventEmitter {
    /**
     * @param {import('ws').ServerOptions} config
     */
    constructor(config: any);
    /** @private */
    private config;
    /**
     * @type {import('ws').Server}
     * @private
     **/
    private wss;
    /**
     * @type {Connection[]}
     * @private
     **/
    private clients;
    /** @private */
    private disposers;
    /**
     * Broadcast a message to all connected clients.
     * @param {any} msg
     */
    broadcastEvent(msg: any): void;
    /**
     * Broadcast a request to all connected clients.
     * @param {any} msg
     * @returns {Promise<any[]>}
     */
    broadcastRequest(msg: any): Promise<any[]>;
    /**
     * Start listening to websocket connections.
     * @returns {void}
     */
    listen(): void;
    /**
     * Stop listening to websocket connections.
     * @returns {Promise}
     */
    dispose(): Promise<any>;
}
declare namespace index {
    export { Server as WebSocketServer };
    export { Connection as WebSocketConnection };
    export { ConnectionEvents };
}
import events = require("./events.js");
export { Connection as WebSocketConnection, Server as WebSocketServer };
