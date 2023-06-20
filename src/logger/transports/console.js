import Transport from './transport.js';

class ConsoleTransport extends Transport {
  /**
   * @param {LogInfo} info - The log info
   */
  log(info) {
    console.log(info);
  }
}

export { ConsoleTransport as default };
