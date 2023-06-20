/**
 * Combine multiple formatters into one.
 * @param {function} ...formats - Formatters to combine.
 * @returns {function} - A function that combines the formatters.
 */
const format = (...formats) => {
  /**
   * Create a new log info object by applying each formatter to the log info.
   * @param {LogInfo} info - The log info.
   * @returns {LogInfo} - The combined log info.
   */
  return info => {
    formats.forEach(f => (info = f(info)));
    return info;
  };
};

export { format as default };
