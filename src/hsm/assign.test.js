import assign from '@/hsm/assign';
import StateMachine from '@/hsm/state-machine';
import assert from 'assert';

describe('hsm/assign.js', () => {
  const machineConfig = {
    id: 'machine',
    initial: 'idle',
    context: {
      test: 'test1'
    },
    states: {
      idle: {
        on: {
          ASSIGN_VALUE: {
            actions: [assign({ test: 'test' })]
          },
          ASSIGN_FUNCTION: {
            actions: [assign({ test: () => 'test2' })]
          }
        }
      }
    }
  };

  it('should assign a value to context property', done => {
    const machine = new StateMachine(machineConfig);
    machine.start();
    assert(machine.state.context.test === 'test1');

    machine.trigger('ASSIGN_VALUE');
    assert(machine.state.context.test === 'test');
    done();
  });

  it('should assign a function return value to context property', done => {
    const machine = new StateMachine(machineConfig);
    machine.start();

    machine.trigger('ASSIGN_FUNCTION');
    assert(machine.state.context.test === 'test2');
    done();
  });
});
