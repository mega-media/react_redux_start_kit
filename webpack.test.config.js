const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Config: path.resolve('./__test__/config.js'),
      mockReducer: path.resolve('./__test__/mockReducer.js'),
      mockStore: path.resolve('./__test__/mockStore.js')
    }
  }
};
