import dateFormat from 'date-format';

/**
 * Add timestamp into the format function.
 * @param {TimestampOptions} options
 */
const timestamp = (options = {}) => {
  /**
   * @param {LogInfo} info
   * @returns {LogInfo} The info with timestamp.
   */
  return info => ({
    ...info,
    timestamp: dateFormat(
      options.format || 'yyyy-MM-ddThh:mm:ss.SSS',
      new Date()
    )
  });
};

export { timestamp as default };
