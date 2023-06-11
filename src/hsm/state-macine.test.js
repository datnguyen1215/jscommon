import StateMachine from './state-machine';
import assert from 'assert';

describe('hsm/state-machine.js', () => {
  const machineConfig = {
    initial: 'idle',
    states: {
      idle: {
        on: {
          RUN: 'running'
        }
      },
      running: {
        on: {
          STOP: 'idle'
        }
      }
    }
  };

  it('should have correct initial state', done => {
    const machine = new StateMachine(machineConfig);
    assert(machine.state.value === 'idle');
    done();
  });

  it('should transition correctly', done => {
    const machine = new StateMachine(machineConfig);
    machine.start();
    machine.trigger('RUN');
    assert(machine.state.value === 'running');
    machine.trigger('STOP');
    assert(machine.state.value === 'idle');
    machine.stop();
    done();
  });

  it("should emit 'transition' event on transition", done => {
    const machine = new StateMachine(machineConfig);
    machine.start();

    machine.on('transition', (next, current) => {
      assert(next.value === 'running');
      assert(current.value === 'idle');
      done();
    });

    machine.trigger('RUN');
    machine.stop();
  });
});
