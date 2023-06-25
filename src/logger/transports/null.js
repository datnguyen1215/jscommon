import Transport from './base';

class NullTransport extends Transport {
  log() {
    // Do nothing
  }
}

export { NullTransport as default };
