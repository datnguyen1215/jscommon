import dateFormat from 'date-format';
import lodash from 'lodash';

const DEFAULT_OPTIONS = {
  format: 'YYYY-MM-DD HH:mm:ss.SSS'
};

/**
 * Add timestamp to the log info.
 * @param {TimestampFormatOptions} [options]
 * @returns {Format}
 */
const timestamp = (options = DEFAULT_OPTIONS) => {
  const { format } = lodash.defaults({}, options, DEFAULT_OPTIONS);
  return info => ({
    ...info,
    timestamp: dateFormat(format, new Date())
  });
};

export { timestamp as default };
