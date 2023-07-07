import createLogger from '#src/logger/create-logger';
import { custom } from '#src/logger/format/index';
import { Transport } from '#src/logger/transports/index';
import assert from 'assert';

class TestTransport extends Transport {
  constructor() {
    super();
    this.logs = [];
  }

  log(message) {
    this.logs.push(message);
  }
}

describe('logger/create-logger.js', () => {
  it('should return a logger', done => {
    const logger = createLogger();
    assert(logger.debug);
    assert(logger.info);
    assert(logger.warn);
    assert(logger.error);
    assert(logger.fatal);
    done();
  });

  it('should create a logger with a custom format', done => {
    const transport = new TestTransport();
    const logger = createLogger({
      format: custom({ label: 'hello' }),
      transports: [transport]
    });

    logger.info('world');
    const log = transport.logs[0];
    assert(log.label === 'hello', 'label should be hello');
    assert(log.message === 'world', 'message should be world');
    assert(log.level === 'info', 'level should be info');
    done();
  });

  it('should create a logger with a custom level', done => {
    const transport = new TestTransport();
    const logger = createLogger({
      level: 'info',
      transports: [transport]
    });

    logger.debug('world');
    assert(transport.logs.length === 0, 'should not log debug');
    logger.info('world');
    assert(transport.logs.length === 1, 'should log info');
    done();
  });
});
