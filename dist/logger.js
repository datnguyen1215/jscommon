'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _commonjsHelpers = require('./_commonjsHelpers-ed042b00.js');
var lodash = require('./lodash-848a4c1f.js');
var assert = require('assert');

class Transport{/**
   * @param {TransportOptions} options
   */constructor(options={}){this.options=options;}/**
   * @param {LogInfo} info - The log info
   * @returns {void}
   * @throws {Error} - Not implemented
   */log(info){throw new Error('Not implemented');}}

class ConsoleTransport extends Transport{/**
   * @param {LogInfo} info - The log info
   */log(info){console.log(info);}}

const index$2={Transport,Console: ConsoleTransport};

var lib = {exports: {}};

(function(module){function padWithZeros(vNumber,width){var numAsString=vNumber.toString();while(numAsString.length<width){numAsString="0"+numAsString;}return numAsString;}function addZero(vNumber){return padWithZeros(vNumber,2);}/**
	 * Formats the TimeOffset
	 * Thanks to http://www.svendtofte.com/code/date_format/
	 * @private
	 */function offset(timezoneOffset){var os=Math.abs(timezoneOffset);var h=String(Math.floor(os/60));var m=String(os%60);h=("0"+h).slice(-2);m=("0"+m).slice(-2);return timezoneOffset===0?"Z":(timezoneOffset<0?"+":"-")+h+":"+m;}function asString(format,date){if(typeof format!=="string"){date=format;format=module.exports.ISO8601_FORMAT;}if(!date){date=module.exports.now();}// Issue # 14 - Per ISO8601 standard, the time string should be local time
// with timezone info.
// See https://en.wikipedia.org/wiki/ISO_8601 section "Time offsets from UTC"
var vDay=addZero(date.getDate());var vMonth=addZero(date.getMonth()+1);var vYearLong=addZero(date.getFullYear());var vYearShort=addZero(vYearLong.substring(2,4));var vYear=format.indexOf("yyyy")>-1?vYearLong:vYearShort;var vHour=addZero(date.getHours());var vMinute=addZero(date.getMinutes());var vSecond=addZero(date.getSeconds());var vMillisecond=padWithZeros(date.getMilliseconds(),3);var vTimeZone=offset(date.getTimezoneOffset());var formatted=format.replace(/dd/g,vDay).replace(/MM/g,vMonth).replace(/y{1,4}/g,vYear).replace(/hh/g,vHour).replace(/mm/g,vMinute).replace(/ss/g,vSecond).replace(/SSS/g,vMillisecond).replace(/O/g,vTimeZone);return formatted;}function setDatePart(date,part,value,local){date['set'+(local?'':'UTC')+part](value);}function extractDateParts(pattern,str,missingValuesDate){// Javascript Date object doesn't support custom timezone.  Sets all felds as
// GMT based to begin with.  If the timezone offset is provided, then adjust
// it using provided timezone, otherwise, adjust it with the system timezone.
var local=pattern.indexOf('O')<0;var monthOverflow=false;var matchers=[{pattern:/y{1,4}/,regexp:"\\d{1,4}",fn:function(date,value){setDatePart(date,'FullYear',value,local);}},{pattern:/MM/,regexp:"\\d{1,2}",fn:function(date,value){setDatePart(date,'Month',value-1,local);if(date.getMonth()!==value-1){// in the event of 31 May --> 31 Feb --> 3 Mar
// this is correct behavior if no Date is involved
monthOverflow=true;}}},{pattern:/dd/,regexp:"\\d{1,2}",fn:function(date,value){// in the event of 31 May --> 31 Feb --> 3 Mar
// reset Mar back to Feb, before setting the Date
if(monthOverflow){setDatePart(date,'Month',date.getMonth()-1,local);}setDatePart(date,'Date',value,local);}},{pattern:/hh/,regexp:"\\d{1,2}",fn:function(date,value){setDatePart(date,'Hours',value,local);}},{pattern:/mm/,regexp:"\\d\\d",fn:function(date,value){setDatePart(date,'Minutes',value,local);}},{pattern:/ss/,regexp:"\\d\\d",fn:function(date,value){setDatePart(date,'Seconds',value,local);}},{pattern:/SSS/,regexp:"\\d\\d\\d",fn:function(date,value){setDatePart(date,'Milliseconds',value,local);}},{pattern:/O/,regexp:"[+-]\\d{1,2}:?\\d{2}?|Z",fn:function(date,value){if(value==="Z"){value=0;}else {value=value.replace(":","");}var offset=Math.abs(value);var timezoneOffset=(value>0?-1:1)*(offset%100+Math.floor(offset/100)*60);// Per ISO8601 standard: UTC = local time - offset
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
date.setUTCMinutes(date.getUTCMinutes()+timezoneOffset);}}];var parsedPattern=matchers.reduce(function(p,m){if(m.pattern.test(p.regexp)){m.index=p.regexp.match(m.pattern).index;p.regexp=p.regexp.replace(m.pattern,"("+m.regexp+")");}else {m.index=-1;}return p;},{regexp:pattern,index:[]});var dateFns=matchers.filter(function(m){return m.index>-1;});dateFns.sort(function(a,b){return a.index-b.index;});var matcher=new RegExp(parsedPattern.regexp);var matches=matcher.exec(str);if(matches){var date=missingValuesDate||module.exports.now();dateFns.forEach(function(f,i){f.fn(date,matches[i+1]);});return date;}throw new Error("String '"+str+"' could not be parsed as '"+pattern+"'");}function parse(pattern,str,missingValuesDate){if(!pattern){throw new Error("pattern must be supplied");}return extractDateParts(pattern,str,missingValuesDate);}/**
	 * Used for testing - replace this function with a fixed date.
	 */function now(){return new Date();}module.exports=asString;module.exports.asString=asString;module.exports.parse=parse;module.exports.now=now;module.exports.ISO8601_FORMAT="yyyy-MM-ddThh:mm:ss.SSS";module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT="yyyy-MM-ddThh:mm:ss.SSSO";module.exports.DATETIME_FORMAT="dd MM yyyy hh:mm:ss.SSS";module.exports.ABSOLUTETIME_FORMAT="hh:mm:ss.SSS";})(lib);var libExports=lib.exports;var dateFormat = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(libExports);

/**
 * Add timestamp into the format function.
 * @param {TimestampOptions} options
 */const timestamp=(options={})=>{/**
   * @param {LogInfo} info
   * @returns {LogInfo} The info with timestamp.
   */return info=>({...info,timestamp:dateFormat(options.format||'yyyy-MM-ddThh:mm:ss.SSS',new Date())});};

/**
 * Customize any properties for the log info.
 * @param {Object} options
 */const custom=options=>{/**
   * Create a custom formatter.
   * @param {LogInfo} info
   * @returns {LogInfo} The log info with the custom properties.
   */return info=>({...info,...options});};

/**
 * Combine multiple formatters into one.
 * @param {function} ...formats - Formatters to combine.
 * @returns {function} - A function that combines the formatters.
 */const format=(...formats)=>{/**
   * Create a new log info object by applying each formatter to the log info.
   * @param {LogInfo} info - The log info.
   * @returns {LogInfo} - The combined log info.
   */return info=>{formats.forEach(f=>info=f(info));return info;};};

const COLORS={debug:'\x1b[34m',info:'\x1b[32m',warn:'\x1b[33m',error:'\x1b[31m',fatal:'\x1b[35m'};/**
 * Colorize the log message.
 * This should only be used for console logging.
 * @param {ColorizeOptions} [options={}] - The options for the formatter.
 * @returns {function} - A function that formats the log message.
 */const colorize=(options={})=>{const colors=lodash.lodash.merge({},COLORS,options.colors);/**
   * @param {LogInfo} info - The log info
   */return info=>{const color=colors[info.level];return {...info,message:`${color}${info.message}\x1b[0m`};};};

const index$1={combine: format,timestamp,custom,colorize};

const LEVELS={debug:0,info:1,warn:2,error:3,fatal:4};

/**
 * @param {LoggerOptions} options
 */const createLogger=options=>{const{transports=[]}=options;let{level:filterLevel,format: format$1}=options;assert(transports.length>0,'You must provide at least one transport');assert(format$1,'You must provide a format function');const log=(level,message)=>{transports.forEach(t=>{format$1=t.options.format||format$1;filterLevel=t.options.level||filterLevel;const filterLevelIndex=LEVELS[filterLevel];const levelIndex=LEVELS[level];// Filter the logs that
if(levelIndex<filterLevelIndex)return;const info=format(custom({level,message}),format$1);t.log(info());});};const logger={debug:msg=>log('debug',msg),info:msg=>log('info',msg),warn:msg=>log('warn',msg),error:msg=>log('error',msg),fatal:msg=>log('fatal',msg)};return logger;};

const index={transports: index$2,createLogger,format: index$1};

exports.createLogger = createLogger;
exports.default = index;
exports.format = index$1;
exports.transports = index$2;
