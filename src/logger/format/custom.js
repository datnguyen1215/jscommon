/**
 * Add custom properties to the info object.
 * @param {object} obj
 * @returns {Format} format function that returns a log info object
 */
const custom = obj => {
  return info => ({
    ...info,
    ...obj
  });
};

export { custom as default };
