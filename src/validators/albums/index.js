const InvariantError = require('../../app/exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

const  AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    console.log(payload, "validator");
    const validationResult = AlbumPayloadSchema.validate(payload);
    console.log(validationResult);
    // if (validationResult.error) throw new InvariantError(validationResult.error.message);
    if (validationResult.error) {
      console.log(validationResult.error.message, "PASS");
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
