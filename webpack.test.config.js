const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'app/assets'),
      '@core': path.resolve(__dirname, 'app/core'),
      '@src': path.resolve(__dirname, 'app/src'),
      '@ext': path.resolve(__dirname, 'app/extensions'),
      '!': path.resolve('./__test__'),
      mockReducer: path.resolve('./__test__/mockReducer.js'),
      mockStore: path.resolve('./__test__/mockStore.js')
    }
  }
};
