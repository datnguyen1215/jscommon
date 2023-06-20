'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('./lodash-848a4c1f.js');
require('./_commonjsHelpers-ed042b00.js');

class Writable{constructor(value){/** @private */this.value=value;/** @private */this.listeners=[];}set(value){const old=this.value;this.value=value;// Notify all the listeners of new changes.
this.listeners.forEach(listener=>listener(value,old));}/**
   * Update the value by merging.
   * @param {any} value
   */update(value){const newVal=lodash.lodash.merge({},this.value,value);this.set(newVal);}/**
   * Subscribe to changes.
   * @param {function} listener
   * @returns {function} destroy
   */subscribe(listener){this.listeners.push(listener);// Make sure to call back immediately with the current value.
listener(this.value);return ()=>this.listeners=this.listeners.filter(l=>l!==listener);}}const writable=value=>new Writable(value);

exports.default = writable;
