'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('./lodash-848a4c1f.js');
var assert = require('assert');
require('./_commonjsHelpers-ed042b00.js');

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
const writable = value => {
  let listeners = [];

  /**
   * Set current value to new value.
   * @param {any} newValue
   * @returns {void}
   **/
  const set = newValue => {
    const old = value;
    value = newValue;
    listeners.forEach(listener => listener(value, old));
  };

  /**
   * Update current value (object) with new value (object) using lodash.merge().
   * @param {any} newValue
   * @returns {void}
   **/
  const update = newValue => {
    newValue = lodash.lodash.merge({}, value, newValue);
    set(newValue);
  };

  /**
   * Subscribe to changes.
   * @param {function(any): void} listener
   * @returns {function(): void} destroy
   */
  const subscribe = listener => {
    assert(typeof listener === 'function', 'listener must be a function');
    listeners.push(listener);
    listener(value);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  return {
    set,
    update,
    subscribe
  };
};

exports.default = writable;
