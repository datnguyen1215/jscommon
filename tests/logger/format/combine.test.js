import custom from '#src/logger/format/custom';
import combine from '#src/logger/format/combine';
import assert from 'assert';

describe('logger/format/combine.js', () => {
  it('should combine formats', done => {
    const format = combine(custom({ a: 1 }), custom({ b: 2 }));
    const info = format();
    assert(info.a === 1);
    assert(info.b === 2);
    done();
  });
});
