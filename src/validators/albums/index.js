const InvariantError = require('../../app/exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

/**
 * Albums Validator.
 * This module provides validation logic for album-related payloads using the Joi library.
 *
 * @module AlbumsValidator
 */
const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
