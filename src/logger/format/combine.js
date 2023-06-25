import lodash from 'lodash';

/**
 * Combine multiple formats into a single format function.
 * @param {...Format} formats
 * @returns {Format} format function that returns a log info object
 */
const combine = (...formats) => {
  return info => {
    let newInfo = lodash.clone(info);
    formats.forEach(format => (newInfo = format(newInfo)));
    return newInfo;
  };
};

export { combine as default };
