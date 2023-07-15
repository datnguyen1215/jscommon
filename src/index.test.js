import index, { utils, hsm, websocket, events } from './index';
import assert from 'assert';

describe('index.js', () => {
  it('should expose index', () => {
    assert(index, 'index is not defined');
  });

  it('should expose index.events', () => {
    assert(events, 'events is not defined');
    assert(index.events, 'index.events is not defined');
  });

  it('should expose index.utils', () => {
    assert(utils, 'utils is not defined');
    assert(index.utils, 'index.utils is not defined');
  });

  it('should expose index.hsm', () => {
    assert(hsm, 'hsm is not defined');
    assert(index.hsm, 'index.hsm is not defined');
  });

  it('should expose index.websocket', () => {
    assert(websocket, 'websocket is not defined');
    assert(index.websocket, 'index.websocket is not defined');
  });
});
