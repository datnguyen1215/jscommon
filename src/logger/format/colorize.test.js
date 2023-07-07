import { createLogger } from '#src/logger/index';
import { combine, custom } from '#src/logger/format/index';
import colorize from '#src/logger/format/colorize';
import { Transport } from '#src/logger/transports/index';
import assert from 'assert';

class TestTransport extends Transport {
  constructor() {
    super();
    this.logs = [];
  }

  log(info) {
    this.logs.push(info);
  }
}

describe('colorize', () => {
  it('should colorize the string', done => {
    const transport = new TestTransport();
    const logger = createLogger({
      format: combine(custom({ label: 'test' }), colorize()),
      transports: [transport]
    });

    logger.info('test');
    const log = transport.logs[0];
    assert(log.message.includes('\x1b[32m'));
    done();
  });
});
