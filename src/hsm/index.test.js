import hsm, { assign, StateMachine } from '.';
import assert from 'assert';

describe('hsm/index.js', () => {
  it('should expose hsm', () => {
    assert(hsm, 'hsm is not defined');
  });

  it('should expose hsm.assign', () => {
    assert(assign, 'assign is not defined');
    assert(hsm.assign, 'hsm.assign is not defined');
  });

  it('should expose hsm.StateMachine', () => {
    assert(StateMachine, 'StateMachine is not defined');
    assert(hsm.StateMachine, 'hsm.StateMachine is not defined');
  });
});
