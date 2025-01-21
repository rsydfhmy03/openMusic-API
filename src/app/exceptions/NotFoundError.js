const ClientError = require('./ClientError');

/**
 * Represents a not found error.
 * This error is used when a requested resource could not be found.
 * @class
 * @extends ClientError
 */
class NotFoundError extends ClientError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
