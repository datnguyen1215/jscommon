export const __esModule: boolean;
export default index;
export class EventEmitter {
    /** @private */
    private events;
    /**
     * Subscribe to an event.
     * @param {string} type
     * @param {Function} listener
     * @return {void}
     */
    on(type: string, listener: Function): void;
    /**
     * Emit an event.
     * @param {string} type
     * @param {any} args
     * @return {void}
     */
    emit(type: string, ...args: any): void;
    /**
     * Remove an event listener.
     * @param {string} type
     * @param {Function} listener
     * @return {void}
     */
    off(type: string, listener: Function): void;
    /**
     * Subscribe to an event once.
     * @param {string} type
     * @param {Function} listener
     * @return {void}
     */
    once(type: string, listener: Function): void;
    /**
     * Remove all listeners for an event.
     * @param {string} type
     * @return {void}
     */
    removeAllListeners(type: string): void;
}
export function create(): {
    on: any;
    emit: any;
    off: any;
    once: any;
    removeAllListeners: any;
};
declare namespace index {
    export { create };
    export { EventEmitter };
}
