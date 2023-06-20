/**
 * @typedef {Object} LogInfo
 * @property {string} level - The log level
 * @property {string} message - The log message
 *
 * @typedef {Object} TransportOptions
 * @property {string} [level] - The level of the log message
 * @property {function} [format] - The format of the log message
 *
 * @typedef {Object} LoggerOptions
 * @property {string} [level] - The level of the log message
 * @property {function} format - The format of the log message
 * @property {Transport[]} [transports] - The transports to log to
 *
 * @typedef {Object} TimestampOptions
 * @property {string} format - The date format
 *
 * @typedef {Object} ColorizeOptions
 * @property {Object} colors - The colors to use for each log level
 * @property {string} [colors.debug='\x1b[34m]'] - The color to use for debug logs
 * @property {string} [colors.info='\x1b[32m'] - The color to use for info logs
 * @property {string} [colors.warn='\x1b[33m'] - The color to use for warn logs
 * @property {string} [colors.error='\x1b[31m'] - The color to use for error logs
 * @property {string} [colors.fatal='\x1b[35m'] - The color to use for fatal logs
 */
