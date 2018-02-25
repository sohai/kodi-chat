const promiseAllInOrder = async promises => {
  const result = [];
  for (let p in promises) {
    result.push(await p);
  }
  return result;
};

const runHooks = (hooks, ...args) => promiseAllInOrder(hooks.map(f => f(...args)));
const hookAdder = hooks => hook => {
  if (hooks.indexOf(hook) < 0) {
    hooks.push(hook);
  }
};

export default factory => {
  let obj = null;
  let onStopHooks = [];
  let onStartHooks = [];

  const isStarted = () => obj !== null;

  const checkIfObjStarted = () => {
    if (!isStarted()) {
      throw new Error('`stefulProxy` instance must be started before');
    }
  };

  const proxy = new Proxy({}, {
    get (target, name) {
      checkIfObjStarted();
      return obj[name];
    },
    set (target, name, value) {
      checkIfObjStarted();
      obj[name] = value;
      return value;
    }
  });

  const start = async (...opts) => {
    if (!isStarted()) {
      obj = await factory(...opts);
      await runHooks(onStartHooks, obj, ...opts);
    }
    return obj;
  };

  const stop = async () => {
    if (isStarted()) {
      await runHooks(onStopHooks, obj);
      obj = null;
    }
  };

  const restart = async (...opts) => {
    await stop();
    await start(...opts);
  };

  return {
    proxy,
    stop,
    start,
    restart,
    onStart: hookAdder(onStartHooks),
    onStop: hookAdder(onStopHooks)
  };
};
