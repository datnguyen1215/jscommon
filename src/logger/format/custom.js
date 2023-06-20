/**
 * Customize any properties for the log info.
 * @param {Object} options
 */
const custom = options => {
  /**
   * Create a custom formatter.
   * @param {LogInfo} info
   * @returns {LogInfo} The log info with the custom properties.
   */
  return info => ({ ...info, ...options });
};

export { custom as default };
