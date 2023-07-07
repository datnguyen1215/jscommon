import combine from '#src/logger/format/combine';
import custom from '#src/logger/format/custom';
import timestamp from '#src/logger/format/timestamp';
import assert from 'assert';

describe('logger/format/timestamp.js', () => {
  it('should return object with timestamp', done => {
    const format = timestamp();
    const info = format();
    assert(info.timestamp, 'timestamp is missing');
    done();
  });

  it('should work with combine function', done => {
    const format = combine(custom({ a: 1 }), timestamp());
    const info = format();
    assert(info.timestamp, 'timestamp is missing');
    assert(info.a === 1, 'a is missing');
    done();
  });
});
