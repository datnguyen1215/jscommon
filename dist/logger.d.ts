export = asString;
declare function asString(format: any, date: any): any;
declare namespace asString {
    export { __esModule, asString, parse, now, ISO8601_FORMAT, ISO8601_WITH_TZ_OFFSET_FORMAT, DATETIME_FORMAT, ABSOLUTETIME_FORMAT, createLogger, index as default, index$1 as format, index$2 as transports };
}
declare const __esModule: boolean;
declare function parse(pattern: any, str: any, missingValuesDate: any): any;
/**
 * Used for testing - replace this function with a fixed date.
 */
declare function now(): Date;
declare const ISO8601_FORMAT: "yyyy-MM-ddThh:mm:ss.SSS";
declare const ISO8601_WITH_TZ_OFFSET_FORMAT: "yyyy-MM-ddThh:mm:ss.SSSO";
declare const DATETIME_FORMAT: "dd MM yyyy hh:mm:ss.SSS";
declare const ABSOLUTETIME_FORMAT: "hh:mm:ss.SSS";
/**
 * Create a logger.
 * @param {CreateLoggerOptions} [options]
 * @returns {Logger}
 */
declare function createLogger(options?: CreateLoggerOptions): Logger;
declare namespace index {
    export { index$2 as transports };
    export { createLogger };
    export { index$1 as format };
}
declare namespace index$1 {
    export { combine };
    export { custom };
    export { timestamp };
    export { colorize };
}
declare namespace index$2 {
    export { ConsoleTransport };
    export { Transport };
    export { NullTransport };
}
/**
 * Combine multiple formats into a single format function.
 * @param {...Format} formats
 * @returns {Format} format function that returns a log info object
 */
declare function combine(...formats: Format[]): Format;
/**
 * Add custom properties to the info object.
 * @param {object} obj
 * @returns {Format} format function that returns a log info object
 */
declare function custom(obj: object): Format;
/**
 * Add timestamp to the log info.
 * @param {TimestampFormatOptions} [options]
 * @returns {Format}
 */
declare function timestamp(options?: TimestampFormatOptions): Format;
/**
 * Colorize the log messae.
 * NOTE: This should only be used for console logs.
 *
 * @param {ColorizeOptions} options
 * @returns {Format}
 */
declare function colorize(options?: ColorizeOptions): Format;
declare class ConsoleTransport extends Transport {
}
declare class Transport {
    /**
     * @param {TransportOptions} options
     */
    constructor(options?: TransportOptions);
    level: any;
    format: any;
    /**
     * Log the given info to the transport.
     * This method is meant to be overriden in sub-classes.
     * @param {LogInfo} info
     */
    log(info: LogInfo): void;
}
declare class NullTransport extends Transport {
    log(): void;
}
