import lodash from 'lodash';

const COLORS = {
  debug: '\x1b[34m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  fatal: '\x1b[35m'
};

/**
 * Colorize the log message.
 * This should only be used for console logging.
 * @param {ColorizeOptions} [options={}] - The options for the formatter.
 * @returns {function} - A function that formats the log message.
 */
const colorize = (options = {}) => {
  const colors = lodash.merge({}, COLORS, options.colors);

  /**
   * @param {LogInfo} info - The log info
   */
  return info => {
    const color = colors[info.level];
    return {
      ...info,
      message: `${color}${info.message}\x1b[0m`
    };
  };
};

export { colorize as default };
