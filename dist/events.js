'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class EventEmitter {
  constructor() {
    /** @private */
    this.events = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} type
   * @param {Function} listener
   * @return {void}
   */
  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  /**
   * Emit an event.
   * @param {string} type
   * @param {any} args
   */
  emit(type, ...args) {
    if (!this.events[type]) return;
    this.events[type].forEach(listener => listener(...args));
  }

  /**
   * Remove an event listener.
   * @param {string} type
   * @param {Function} listener
   */
  off(type, listener) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(x => x !== listener);
  }

  /**
   * Subscribe to an event once.
   * @param {string} type
   * @param {Function} listener
   */
  once(type, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(type, onceListener);
    };
    this.on(type, onceListener);
  }

  /**
   * Remove all listeners for an event.
   * @param {string} type
   */
  removeAllListeners(type) {
    if (!this.events[type]) return;
    this.events[type] = [];
  }
}
const create = () => {
  const events = new EventEmitter();
  return {
    on: events.on.bind(events),
    emit: events.emit.bind(events),
    off: events.off.bind(events),
    once: events.once.bind(events),
    removeAllListeners: events.removeAllListeners.bind(events)
  };
};
const index = {
  create,
  EventEmitter
};

exports.EventEmitter = EventEmitter;
exports.create = create;
exports.default = index;
