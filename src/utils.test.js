import utils, { DEFAULT_FUNCTION } from './utils';
import assert from 'assert';

describe('utils.js', () => {
  it('should expose utils', () => {
    assert(utils, 'utils is not defined');
  });

  it('should expose utils.DEFAULT_FUNCTION', () => {
    assert(utils.DEFAULT_FUNCTION, 'utils.DEFAULT_FUNCTION is not defined');
  });

  it('should expose DEFAULT_FUNCTION as a named export', () => {
    assert(DEFAULT_FUNCTION, 'DEFAULT_FUNCTION is not defined');
  });
});
