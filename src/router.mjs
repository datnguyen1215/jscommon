import { DEFAULT_FUNCTION } from './utils.js';

const router = () => {
  const handlers = {};

  const use = (...args) => {
    const [first, second] = args;

    // assign middleware.
    if (typeof first === 'function') {
      handlers['.'] = handlers['.'] || [];
      return handlers['.'].push(first);
    }

    if (typeof second !== 'function' && !second.execute)
      throw new Error('Second argument must be a function or router');

    // assign handler for specific path.
    const pathArray = first.split(':');
    if (pathArray.length > 1) {
      const route = router();
      const current = pathArray[0];
      route.use(pathArray.slice(1).join(':'), second);

      handlers[current] = handlers[current] || [];
      handlers[current].push(route);
      return;
    }

    handlers[first] = handlers[first] || [];
    handlers[first].push(second);
  };

  const runActions = (actions, data, ws, done = DEFAULT_FUNCTION) => {
    // get the first handler
    const action = actions[0];

    // no more action to run.
    if (!action) return done();

    // if the action is a router.
    if (action.execute) return action.execute(data, ws);

    // run the next handlers if it's called back (next function)
    action(data, ws, () => runActions(actions.slice(1), data, ws, done));
  };

  const execute = (data, ws) => {
    let { path } = data;

    const remaining = path.remaining.slice(1);
    const current = path.remaining[0];

    path = { ...path, remaining };

    // always execute the root middleware first
    const rootActions = handlers['.'] || [];
    runActions(rootActions, { ...data, path }, ws, () => {
      const actions = handlers[current] || [];
      runActions(actions, { ...data, path }, ws);
    });
  };

  const handle = (path, message, ws) => {
    const pathArray = path.split(':');
    execute({ path: { remaining: pathArray }, message }, ws);
  };

  return { use, handle, execute };
};

export default router;
