import { createMachine, interpret } from 'xstate';
import { EventEmitter } from '../events';

class StateMachine extends EventEmitter {
  /**
   * @param {import('xstate').MachineConfig} config
   * @param {import('xstate').MachineSchema} options
   */
  constructor(config, options) {
    super();

    this.machine = createMachine(
      {
        preserveActionOrder: true,
        predictableActionArguments: false,
        ...config
      },
      options
    );
    this.state = this.machine.initialState;

    /** @private */
    this.service = interpret(this.machine, { execute: false });

    this.service.onTransition(next => {
      this.emit('transition', next, this.state);
      this.state = next;
      this.service.execute(this.state);
    });
  }

  /**
   * Start state machine.
   */
  start() {
    this.service.start();
  }

  /**
   * Stop and dispose state machine.
   */
  stop() {
    this.service.stop();
  }

  /**
   * @param {*} evt
   * @param {*} data
   */
  trigger(evt, data = {}) {
    this.service.send(evt, { data });
  }
}

export { StateMachine as default };
