import { createLogger, format, transports } from '#dist/logger';
import assert from 'assert';

const { Transport } = transports;

describe('logger/createLogger', () => {
  it('createLogger() should check for format', done => {
    try {
      createLogger();
      done('Should have thrown an error');
    } catch (err) {
      done();
    }
  });

  it('createLogger() should check for transports', done => {
    try {
      createLogger({ format: format.timestamp() });
      done('Should have thrown an error');
    } catch (err) {
      done();
    }
  });

  it('createLogger() should expose info, warn, error, debug', () => {
    const logger = createLogger({
      format: format.timestamp(),
      transports: [new Transport()]
    });

    assert(logger.info, 'Should have info');
    assert(logger.warn, 'Should have warn');
    assert(logger.error, 'Should have error');
    assert(logger.debug, 'Should have debug');
  });
});
