import writable from '@/writable';
import assert from 'assert';

describe('writable', () => {
  it('should expose writable()', () => {
    assert(writable, 'writable is not defined');
    assert(typeof writable === 'function', 'writable is not a function');
  });

  it('should subscribe and received value back immediately', () => {
    const store = writable({ count: 0 });
    const destroy = store.subscribe(value => {
      assert(value.count === 0);
    });

    assert(typeof destroy === 'function', 'destroy is not a function');
    destroy();
  });

  it('set() should call listener', () => {
    const store = writable({ count: 0 });

    let firstTimeCalled = true;

    const destroy = store.subscribe((value, old) => {
      if (firstTimeCalled) {
        assert(value.count === 0);
        assert(!old);
        firstTimeCalled = false;
        return;
      }

      assert(value.count === 1);
      assert(old.count === 0);
    });

    store.set({ count: 1 });
    destroy();
  });

  it('update() should only update partially and call listener', () => {
    const store = writable({ count: 1, test: 'here' });
    let firstTimeCalled = true;

    const destroy = store.subscribe((value, old) => {
      if (firstTimeCalled) {
        assert(value.count === 1);
        assert(value.test === 'here');
        assert(!old);
        firstTimeCalled = false;
        return;
      }

      assert(value.count === 2);
      assert(value.test === 'here');
      assert(old.count === 1);
      assert(old.test === 'here');
    });

    store.update({ count: 2 });
    destroy();
  });
});
