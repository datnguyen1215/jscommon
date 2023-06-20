class Transport {
  /**
   * @param {TransportOptions} options
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * @param {LogInfo} info - The log info
   * @returns {void}
   * @throws {Error} - Not implemented
   */
  log(info) {
    throw new Error('Not implemented');
  }
}

export { Transport as default };
