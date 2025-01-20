const InvariantError = require('../../app/exceptions/InvariantError');
const { SongPayloadSchema } = require('./schema');

/**
 * Songs Validator.
 * This module provides validation logic for song-related payloads using the Joi library.
 *
 * @module SongsValidator
 */
const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

module.exports = SongsValidator;
