'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-673cd81f.js');

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _rollupPluginBabelHelpers._classCallCheck(this, EventEmitter);
    this.events = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} type
   * @param {Function} listener
   * @return {void}
   */
  _rollupPluginBabelHelpers._createClass(EventEmitter, [{
    key: "on",
    value: function on(type, listener) {
      this.events[type] = this.events[type] || [];
      this.events[type].push(listener);
    }

    /**
     * Emit an event.
     * @param {string} type
     * @param {any} args
     */
  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (!this.events[type]) return;
      this.events[type].forEach(function (listener) {
        return listener.apply(void 0, args);
      });
    }

    /**
     * Remove an event listener.
     * @param {string} type
     * @param {Function} listener
     */
  }, {
    key: "off",
    value: function off(type, listener) {
      if (!this.events[type]) return;
      this.events[type] = this.events[type].filter(function (x) {
        return x !== listener;
      });
    }

    /**
     * Subscribe to an event once.
     * @param {string} type
     * @param {Function} listener
     */
  }, {
    key: "once",
    value: function once(type, listener) {
      var _this = this;
      var onceListener = function onceListener() {
        listener.apply(void 0, arguments);
        _this.off(type, onceListener);
      };
      this.on(type, onceListener);
    }

    /**
     * Remove all listeners for an event.
     * @param {string} type
     */
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(type) {
      if (!this.events[type]) return;
      this.events[type] = [];
    }
  }]);
  return EventEmitter;
}();

exports.EventEmitter = EventEmitter;
exports.default = EventEmitter;
