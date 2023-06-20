import { custom, combine } from './format';
import assert from 'assert';
import levels from './levels';

/**
 * @param {LoggerOptions} options
 */
const createLogger = options => {
  const { transports = [] } = options;
  let { level: filterLevel, format } = options;

  assert(transports.length > 0, 'You must provide at least one transport');
  assert(format, 'You must provide a format function');

  const log = (level, message) => {
    transports.forEach(t => {
      format = t.options.format || format;
      filterLevel = t.options.level || filterLevel;

      const filterLevelIndex = levels[filterLevel];
      const levelIndex = levels[level];

      // Filter the logs that
      if (levelIndex < filterLevelIndex) return;

      const info = combine(custom({ level, message }), format);
      t.log(info());
    });
  };

  const logger = {
    debug: msg => log('debug', msg),
    info: msg => log('info', msg),
    warn: msg => log('warn', msg),
    error: msg => log('error', msg),
    fatal: msg => log('fatal', msg)
  };

  return logger;
};

export { createLogger as default };
