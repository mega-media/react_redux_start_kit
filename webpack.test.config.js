const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve('./app/dist'),
      '@': path.resolve('./app/assets'),
      '!': path.resolve('./__test__'),
      ext: path.resolve(__dirname, 'app/extensions'),
      Config: path.resolve('./config/global-constants.js'),
      mockReducer: path.resolve('./__test__/mockReducer.js'),
      mockStore: path.resolve('./__test__/mockStore.js')
    }
  }
};
