const socketRouterBuilder = (routes) => (socket, io) =>
  Object.values(routes).forEach((item) => {
    const params = [
      item.name,
      (data, callback, ...args) =>
        item.handler(socket, io, data, callback, ...args),
    ].filter(Boolean);
    socket[item.method](...params);
  });

export { socketRouterBuilder };
