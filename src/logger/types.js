/**
 * @typedef {Function} Format
 * @param {LogInfo} info
 * @returns {LogInfo}
 *
 * @typedef {object} LogInfo
 * @property {string} level
 * @property {string} message
 *
 * @typedef {object} TimestampFormatOptions
 * @property {string} [format='YYYY-MM-DD HH:mm:ss.SSS']
 *
 * @typedef {Object} TransportOptions
 * @property {string} [level='debug'] - The level of the log message
 * @property {function} [format] - The format of the log message
 *
 * @typedef {Object} CreateLoggerOptions
 * @property {string} [level='debug'] - The level of the logger
 * @property {Format} [format] - The format of the logger
 * @property {import('./transports/base').default[]} [transports] - The transports of the logger
 *
 * @typedef {Object} ColorizeOptions
 * @property {Object} [colors] - The colors of the log message
 *
 * @typedef {Object} Logger
 * @property {Function(message)} debug
 * @property {Function(message)} info
 * @property {Function(message)} warn
 * @property {Function(message)} error
 * @property {Function(message)} fatal
 */
