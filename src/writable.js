import lodash from 'lodash';
import assert from 'assert';

/**
 * @param {any} value
 * @returns {import('@/types').Writable)}
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
    newValue = lodash.merge({}, value, newValue);
    set(newValue);
  };

  /**
   * Subscribe to changes.
   * @param {function(any): void} listener
   * @returns {function(): void} destroy
   */
  const subscribe = listener => {
    assert(typeof listener === 'function', 'listener must be a function')

    listeners.push(listener);

    listener(value);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  return { set, update, subscribe };
};

export default writable;
