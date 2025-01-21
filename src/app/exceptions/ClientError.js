/**
 * Represents a client error.
 * This class serves as a base class for custom error types.
 * @class
 * @extends Error
 */
class ClientError extends Error {
  /**
   * Creates an instance of ClientError.
   * @param {string} message - The error message.
   * @param {number} [statusCode=400] - The HTTP status code associated with the error. Defaults to 400.
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
