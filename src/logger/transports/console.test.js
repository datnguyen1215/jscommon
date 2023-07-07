import ConsoleTransport from '#src/logger/transports/console';
import assert from 'assert';

describe('logger/transports/console.js', () => {
  it('should log to console', done => {
    const logs = {
      info: [],
      debug: [],
      warn: [],
      error: [],
      fatal: []
    };

    const originalConsole = console;
    console = {
      debug: info => logs.debug.push(info),
      info: info => logs.info.push(info),
      warn: info => logs.warn.push(info),
      error: info => logs.error.push(info),
      fatal: info => logs.fatal.push(info)
    };

    const consoleTransport = new ConsoleTransport();
    consoleTransport.log({ level: 'info', message: 'test' });
    consoleTransport.log({ level: 'debug', message: 'test' });
    consoleTransport.log({ level: 'warn', message: 'test' });
    consoleTransport.log({ level: 'error', message: 'test' });
    consoleTransport.log({ level: 'fatal', message: 'test' });

    assert(logs.info.length === 1, 'info log should be called once');
    assert(logs.debug.length === 1, 'debug log should be called once');
    assert(logs.warn.length === 1, 'warn log should be called once');
    assert(logs.error.length === 1, 'error log should be called once');
    assert(logs.fatal.length === 1, 'fatal log should be called once');

    console = originalConsole;
    done();
  });
});
