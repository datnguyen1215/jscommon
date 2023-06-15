const assign = context => {
  return (ctx, evt) => {
    Object.keys(context).forEach(key => {
      const action = context[key];
      if (typeof action === 'function') return (ctx[key] = action(ctx, evt));

      ctx[key] = context[key];
    });
  };
};

export { assign as default };
