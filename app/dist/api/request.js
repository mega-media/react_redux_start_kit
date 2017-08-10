const context = require.context('./', true, /\w+\/request\.js/);

export default context
  .keys()
  .reduce(
    (files, filename) => Object.assign(files, context(filename)['default']),
    {}
  );
