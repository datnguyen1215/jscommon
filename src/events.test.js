import events, { EventEmitter, create } from '@/events';
import assert from 'assert';

describe('events', () => {
  it('should work with import default and named import', done => {
    assert(events.create);
    assert(create);
    assert(events.EventEmitter === EventEmitter);
    assert(EventEmitter);
    done();
  });

  it('on() should be called multiple times', done => {
    const emitter = new EventEmitter();

    let count = 0;

    const onEvent = () => count++;
    emitter.on('event', onEvent);

    emitter.emit('event');
    emitter.emit('event');
    emitter.emit('event');

    assert(count === 3);
    emitter.off('event', onEvent);
    done();
  });

  it('off() should remove listener', done => {
    const emitter = new EventEmitter();

    let count = 0;
    const listener = () => count++;
    emitter.on('event', listener);
    emitter.emit('event');
    emitter.off('event', listener);
    emitter.emit('event');

    assert(count === 1);
    done();
  });

  it('once() should be called only once', done => {
    const emitter = new EventEmitter();

    let count = 0;
    emitter.once('event', () => count++);

    emitter.emit('event');
    emitter.emit('event');
    emitter.emit('event');

    assert(count === 1);
    done();
  });

  it('removeAllListeners() should remove all listeners', done => {
    const emitter = new EventEmitter();

    let count = 0;
    emitter.on('event', () => count++);
    emitter.on('event', () => count++);

    emitter.removeAllListeners('event');
    emitter.emit('event');
    emitter.emit('event');
    emitter.emit('event');

    assert(count === 0);
    done();
  });

  it('create() should create a new instance', done => {
    const emitter = events.create();
    emitter.once('event', () => done());
    emitter.emit('event');
  });
});
