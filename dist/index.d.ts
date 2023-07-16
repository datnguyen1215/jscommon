export const __esModule: boolean;
export default index;
declare namespace index {
    let events: {
        create: () => {
            on: any;
            emit: any;
            off: any;
            once: any;
            removeAllListeners: any;
        };
        EventEmitter: typeof import("./events.js").EventEmitter;
    };
    let utils: {
        DEFAULT_FUNCTION: () => void;
    };
    let hsm: {
        StateMachine: typeof import("./hsm.js").StateMachine;
        assign: (context: any) => (arg0: Record<string, any>, arg1: import("xstate").EventData) => void;
    };
    let websocket: {
        WebSocketServer: typeof import("./websocket.js").WebSocketServer;
        WebSocketConnection: typeof import("./websocket.js").WebSocketConnection;
        ConnectionEvents: {
            EVENT: string;
            REQUEST: string;
            RESPONSE: string;
            PING: string;
            MESSAGE: string;
            CLOSE: string;
        };
    };
}
export { _default as events, _default as utils, _default as hsm, _default as websocket };
