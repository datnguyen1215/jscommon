const DEFAULT_COLORS = {
  debug: '\x1b[34m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  fatal: '\x1b[35m'
};

/**
 * Colorize the log messae.
 * NOTE: This should only be used for console logs.
 *
 * @param {ColorizeOptions} options
 * @returns {Format}
 */
const colorize = (options = {}) => {
  const colors = { ...DEFAULT_COLORS, ...options.colors };

  return info => {
    const color = colors[info.level];
    return {
      ...info,
      message: `${color}${info.message}\x1b[0m`
    };
  };
};

export { colorize as default };
