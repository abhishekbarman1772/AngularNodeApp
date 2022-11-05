const Exception = require('./Exception');

class InvalidInputError extends Exception {
  constructor(message, requestUser = null, requestParams = null, requestBody = null) {
    super(message, 400, 'invalid_input', requestUser, requestParams, requestBody);

    this.name = 'InvalidInputError';
    this.status = 400;
    this.code = 'invalid_input';
  }
}

module.exports = InvalidInputError;
