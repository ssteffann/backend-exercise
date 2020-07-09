/**
 * Check the current environment and
 * return the correct config.
 */

module.exports = function get() {
  return require(`./${process.env.NODE_ENV}`);
};
