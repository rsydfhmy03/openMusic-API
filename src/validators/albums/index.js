const InvariantError = require('../../app/exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    console.log(validationResult);
    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

module.exports = AlbumsValidator;
