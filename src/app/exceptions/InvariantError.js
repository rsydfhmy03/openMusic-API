const ClientError = require('./ClientError');

/**
 * Represents an invariant error.
 * This error is used for scenarios where a business rule or validation constraint is violated.
 * @class
 * @extends ClientError
 */
class InvariantError extends ClientError {
  /**
   * Creates an instance of InvariantError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
