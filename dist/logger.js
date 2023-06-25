'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('./lodash-848a4c1f.js');
var _commonjsHelpers = require('./_commonjsHelpers-ed042b00.js');

const DEFAULT_OPTIONS$1 = {
  level: 'debug'
};
class Transport {
  /**
   * @param {TransportOptions} options
   */
  constructor(options = DEFAULT_OPTIONS$1) {
    options = lodash.lodash.merge({}, DEFAULT_OPTIONS$1, options);
    this.level = options.level;
    this.format = options.format;
  }

  /**
   * Log the given info to the transport.
   * This method is meant to be overriden in sub-classes.
   * @param {LogInfo} info
   */
  log(info) {}
}

class ConsoleTransport extends Transport {
  /**
   * @param {LogInfo} info
   */
  log(info) {
    console[info.level](info.message);
  }
}

class NullTransport extends Transport {
  log() {
    // Do nothing
  }
}

const index$2 = {
  ConsoleTransport,
  Transport,
  NullTransport
};

/**
 * Combine multiple formats into a single format function.
 * @param {...Format} formats
 * @returns {Format} format function that returns a log info object
 */
const combine = (...formats) => {
  return info => {
    let newInfo = lodash.lodash.clone(info);
    formats.forEach(format => newInfo = format(newInfo));
    return newInfo;
  };
};

/**
 * Add custom properties to the info object.
 * @param {object} obj
 * @returns {Format} format function that returns a log info object
 */
const custom = obj => {
  return info => ({
    ...info,
    ...obj
  });
};

var lib = {exports: {}};

(function (module) {

  function padWithZeros(vNumber, width) {
    var numAsString = vNumber.toString();
    while (numAsString.length < width) {
      numAsString = "0" + numAsString;
    }
    return numAsString;
  }
  function addZero(vNumber) {
    return padWithZeros(vNumber, 2);
  }

  /**
   * Formats the TimeOffset
   * Thanks to http://www.svendtofte.com/code/date_format/
   * @private
   */
  function offset(timezoneOffset) {
    var os = Math.abs(timezoneOffset);
    var h = String(Math.floor(os / 60));
    var m = String(os % 60);
    h = ("0" + h).slice(-2);
    m = ("0" + m).slice(-2);
    return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h + ":" + m;
  }
  function asString(format, date) {
    if (typeof format !== "string") {
      date = format;
      format = module.exports.ISO8601_FORMAT;
    }
    if (!date) {
      date = module.exports.now();
    }

    // Issue # 14 - Per ISO8601 standard, the time string should be local time
    // with timezone info.
    // See https://en.wikipedia.org/wiki/ISO_8601 section "Time offsets from UTC"

    var vDay = addZero(date.getDate());
    var vMonth = addZero(date.getMonth() + 1);
    var vYearLong = addZero(date.getFullYear());
    var vYearShort = addZero(vYearLong.substring(2, 4));
    var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
    var vHour = addZero(date.getHours());
    var vMinute = addZero(date.getMinutes());
    var vSecond = addZero(date.getSeconds());
    var vMillisecond = padWithZeros(date.getMilliseconds(), 3);
    var vTimeZone = offset(date.getTimezoneOffset());
    var formatted = format.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear).replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond).replace(/SSS/g, vMillisecond).replace(/O/g, vTimeZone);
    return formatted;
  }
  function setDatePart(date, part, value, local) {
    date['set' + (local ? '' : 'UTC') + part](value);
  }
  function extractDateParts(pattern, str, missingValuesDate) {
    // Javascript Date object doesn't support custom timezone.  Sets all felds as
    // GMT based to begin with.  If the timezone offset is provided, then adjust
    // it using provided timezone, otherwise, adjust it with the system timezone.
    var local = pattern.indexOf('O') < 0;
    var monthOverflow = false;
    var matchers = [{
      pattern: /y{1,4}/,
      regexp: "\\d{1,4}",
      fn: function (date, value) {
        setDatePart(date, 'FullYear', value, local);
      }
    }, {
      pattern: /MM/,
      regexp: "\\d{1,2}",
      fn: function (date, value) {
        setDatePart(date, 'Month', value - 1, local);
        if (date.getMonth() !== value - 1) {
          // in the event of 31 May --> 31 Feb --> 3 Mar
          // this is correct behavior if no Date is involved
          monthOverflow = true;
        }
      }
    }, {
      pattern: /dd/,
      regexp: "\\d{1,2}",
      fn: function (date, value) {
        // in the event of 31 May --> 31 Feb --> 3 Mar
        // reset Mar back to Feb, before setting the Date
        if (monthOverflow) {
          setDatePart(date, 'Month', date.getMonth() - 1, local);
        }
        setDatePart(date, 'Date', value, local);
      }
    }, {
      pattern: /hh/,
      regexp: "\\d{1,2}",
      fn: function (date, value) {
        setDatePart(date, 'Hours', value, local);
      }
    }, {
      pattern: /mm/,
      regexp: "\\d\\d",
      fn: function (date, value) {
        setDatePart(date, 'Minutes', value, local);
      }
    }, {
      pattern: /ss/,
      regexp: "\\d\\d",
      fn: function (date, value) {
        setDatePart(date, 'Seconds', value, local);
      }
    }, {
      pattern: /SSS/,
      regexp: "\\d\\d\\d",
      fn: function (date, value) {
        setDatePart(date, 'Milliseconds', value, local);
      }
    }, {
      pattern: /O/,
      regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
      fn: function (date, value) {
        if (value === "Z") {
          value = 0;
        } else {
          value = value.replace(":", "");
        }
        var offset = Math.abs(value);
        var timezoneOffset = (value > 0 ? -1 : 1) * (offset % 100 + Math.floor(offset / 100) * 60);
        // Per ISO8601 standard: UTC = local time - offset
        //
        // For example, 2000-01-01T01:00:00-0700
        //   local time: 2000-01-01T01:00:00
        //   ==> UTC   : 2000-01-01T08:00:00 ( 01 - (-7) = 8 )
        //
        // To make it even more confusing, the date.getTimezoneOffset() is
        // opposite sign of offset string in the ISO8601 standard.  So if offset
        // is '-0700' the getTimezoneOffset() would be (+)420. The line above
        // calculates timezoneOffset to matche Javascript's behavior.
        //
        // The date/time of the input is actually the local time, so the date
        // object that was constructed is actually local time even thought the
        // UTC setters are used.  This means the date object's internal UTC
        // representation was wrong.  It needs to be fixed by substracting the
        // offset (or adding the offset minutes as they are opposite sign).
        //
        // Note: the time zone has to be processed after all other fields are
        // set.  The result would be incorrect if the offset was calculated
        // first then overriden by the other filed setters.
        date.setUTCMinutes(date.getUTCMinutes() + timezoneOffset);
      }
    }];
    var parsedPattern = matchers.reduce(function (p, m) {
      if (m.pattern.test(p.regexp)) {
        m.index = p.regexp.match(m.pattern).index;
        p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
      } else {
        m.index = -1;
      }
      return p;
    }, {
      regexp: pattern,
      index: []
    });
    var dateFns = matchers.filter(function (m) {
      return m.index > -1;
    });
    dateFns.sort(function (a, b) {
      return a.index - b.index;
    });
    var matcher = new RegExp(parsedPattern.regexp);
    var matches = matcher.exec(str);
    if (matches) {
      var date = missingValuesDate || module.exports.now();
      dateFns.forEach(function (f, i) {
        f.fn(date, matches[i + 1]);
      });
      return date;
    }
    throw new Error("String '" + str + "' could not be parsed as '" + pattern + "'");
  }
  function parse(pattern, str, missingValuesDate) {
    if (!pattern) {
      throw new Error("pattern must be supplied");
    }
    return extractDateParts(pattern, str, missingValuesDate);
  }

  /**
   * Used for testing - replace this function with a fixed date.
   */
  function now() {
    return new Date();
  }
  module.exports = asString;
  module.exports.asString = asString;
  module.exports.parse = parse;
  module.exports.now = now;
  module.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
  module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
  module.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
  module.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
})(lib);
var libExports = lib.exports;
var dateFormat = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(libExports);

const DEFAULT_OPTIONS = {
  format: 'YYYY-MM-DD HH:mm:ss.SSS'
};

/**
 * Add timestamp to the log info.
 * @param {TimestampFormatOptions} [options]
 * @returns {Format}
 */
const timestamp = (options = DEFAULT_OPTIONS) => {
  const {
    format
  } = lodash.lodash.defaults({}, options, DEFAULT_OPTIONS);
  return info => ({
    ...info,
    timestamp: dateFormat(format, new Date())
  });
};

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
  const colors = {
    ...DEFAULT_COLORS,
    ...options.colors
  };
  return info => {
    const color = colors[info.level];
    return {
      ...info,
      message: `${color}${info.message}\x1b[0m`
    };
  };
};

const index$1 = {
  combine,
  custom,
  timestamp,
  colorize
};

const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4
};

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
      format = combine(custom({
        level,
        message
      }), format);
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

const index = {
  transports: index$2,
  createLogger,
  format: index$1
};

exports.createLogger = createLogger;
exports.default = index;
exports.format = index$1;
exports.transports = index$2;
