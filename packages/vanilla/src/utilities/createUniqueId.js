const createUniqueID = (prefix) =>
  (prefix ? prefix + '-' : '') + Math.random().toString(36).slice(2, 7);

export { createUniqueID };
