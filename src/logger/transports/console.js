import Transport from './base';

class ConsoleTransport extends Transport {
  /**
   * @param {LogInfo} info
   */
  log(info) {
    console[info.level](info.message);
  }
}

export { ConsoleTransport as default };
