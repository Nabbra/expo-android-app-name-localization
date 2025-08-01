const { withAndroidLocalizedAppName } = require('./src/withAndroidLocalizedAppName');

module.exports = function (config, props) {
  return withAndroidLocalizedAppName(config, props);
};
