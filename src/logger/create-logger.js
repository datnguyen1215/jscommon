import { combine, custom } from './format';
import levels from './levels';
import { NullTransport } from './transports';

const getFilterLevel = (first, second) => {
  const firstLevel = levels[first];
  const secondLevel = levels[second];

  return firstLevel > secondLevel ? first : second;
};

/**
 * Create a logger.
 * @param {CreateLoggerOptions} [options]
 * @returns {Logger}
 */
const createLogger = (options = {}) => {
  let {
    level: loggerLevel,
    format: loggerFormat = custom({}),
    transports = [new NullTransport()]
  } = options;

  // Always have a default null transport.
  if (transports.length === 0) transports.push(new NullTransport());

  const log = (level, message) => {
    for (let transport of transports) {
      let format = transport.format || loggerFormat;
      const filterLevel = getFilterLevel(loggerLevel, transport.level);

      // Do not log if the level is lower than the filter level
      if (levels[level] < levels[filterLevel]) return;

      format = combine(custom({ level, message }), format);
      transport.log(format());
    }
  };

  return {
    debug: message => log('debug', message),
    info: message => log('info', message),
    warn: message => log('warn', message),
    error: message => log('error', message),
    fatal: message => log('fatal', message)
  };
};

export { createLogger as default };
