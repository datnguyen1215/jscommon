export const __esModule: boolean;
export default index;
export class StateMachine extends events.EventEmitter {
    /**
     * @param {import('xstate').DefaultContext} config
     * @param {import('xstate').ServiceMap} [options]
     */
    constructor(config: import('xstate').DefaultContext, options?: import('xstate').ServiceMap);
    /** @private */
    private machine;
    state: any;
    /** @private */
    private service;
    /**
     * Start state machine.
     */
    start(): void;
    /**
     * Stop and dispose state machine.
     */
    stop(): void;
    /**
     * @param {*} evt
     * @param {*} data
     */
    trigger(evt: any, data?: any): void;
}
/**
 * Assigns context to the machine.
 * @param {object} context - The context to assign to the machine.
 * @returns {function(import('xstate').DefaultContext, import('xstate').EventData): void} - The function to assign the context to the machine.
 */
export function assign(context: object): (arg0: import('xstate').DefaultContext, arg1: import('xstate').EventData) => void;
declare namespace index {
    export { StateMachine };
    export { assign };
}
import events = require("./events.js");
