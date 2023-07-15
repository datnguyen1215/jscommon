import './alias';
import utils from '@/utils';
import assert from 'assert';

describe('alias.js', () => {
  it('should resolve to @ to /src', () => {
    assert(utils, 'utils is not defined');
    assert(utils.DEFAULT_FUNCTION, 'utils.DEFAULT_FUNCTION is not defined');
  });
});
