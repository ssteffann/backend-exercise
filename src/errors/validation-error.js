/**
 * Error with code 400
 */
module.exports = class ValidationError extends Error {
  constructor(message, code) {
    super(
      message ||
        'Oops something went wrong, please check your data',
    );
    this.code = code || 400;
  }
};
