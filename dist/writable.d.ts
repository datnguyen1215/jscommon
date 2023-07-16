export const __esModule: boolean;
export default writable;
export type Writable = {
    set: (arg0: any) => void;
    update: (arg0: any) => void;
    subscribe: (arg0: (arg0: any) => void) => any;
};
/**
 * @typedef {Object} Writable
 * @property {function(any): void} set
 * @property {function(any): void} update
 * @property {function(function(any): void): any} subscribe
 */
/**
 * @param {any} value
 * @returns {Writable}
 */
declare function writable(value: any): Writable;
