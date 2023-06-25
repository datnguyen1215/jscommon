import lodash from 'lodash';

const DEFAULT_OPTIONS = {
  level: 'debug'
};

class Transport {
  /**
   * @param {TransportOptions} options
   */
  constructor(options = DEFAULT_OPTIONS) {
    options = lodash.merge({}, DEFAULT_OPTIONS, options);
    this.level = options.level;
    this.format = options.format;
  }

  /**
   * Log the given info to the transport.
   * This method is meant to be overriden in sub-classes.
   * @param {LogInfo} info
   */
  log(info) {}
}

export { Transport as default };
