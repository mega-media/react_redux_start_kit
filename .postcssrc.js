const autoprefixer = require('autoprefixer');
module.exports = {
    parser: false,
    map: false,
    plugins: [
        autoprefixer({browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9']})
    ]
}