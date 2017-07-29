module.exports = require(process.env.NODE_ENV === 'production'
  ? './env/prov'
  : './env/dev');
