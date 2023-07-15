/**
 * Assigns context to the machine.
 * @param {object} context - The context to assign to the machine.
 * @returns {function(import('xstate').DefaultContext, import('xstate').EventData): void} - The function to assign the context to the machine.
 */
const assign = context => {
  /**
   * @param {import('xstate').DefaultContext} ctx - The current state of the machine.
   * @param {import("xstate").EventData} evt - The event that was sent to the machine.
   * @returns {void}
   */
  return (ctx, evt) => {
    Object.keys(context).forEach(key => {
      const action = context[key];
      if (typeof action === 'function') return (ctx[key] = action(ctx, evt));

      ctx[key] = context[key];
    });
  };
};

export { assign as default };
