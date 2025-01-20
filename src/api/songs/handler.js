const autoBind = require('auto-bind');

/**
 * Handler class for managing song operations.
 * This class handles requests for adding, retrieving, updating, and deleting songs.
 * @class
 */
class SongHandler {
  /**
   * Initializes the SongHandler instance.
   * @param {Object} songService - The service layer for song operations.
   * @param {Object} validator - The validator used to validate song payloads.
   */
  constructor(songService, validator) {
    this._songService = songService;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Handles the request to add a new song.
   * @async
   * @param {Object} request - The Hapi request object.
   * @param {Object} h - The Hapi response toolkit.
   * @returns {Object} The response object containing success status and the song ID.
   */
  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._songService.create(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Song added successfully',
      data: {
        songId,
      },
    });

    response.code(201);
    return response;
  }

  /**
   * Handles the request to retrieve a list of songs with optional filters.
   * @async
   * @param {Object} request - The Hapi request object containing query parameters.
   * @returns {Object} The response object containing success status and a list of songs.
   */
  async getSongsHandler(request) {
    const songs = await this._songService.getSongsWithFilters(request.query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  /**
   * Handles the request to retrieve a song by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and song data.
   */
  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._songService.getById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  /**
   * Handles the request to update a song by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and a message.
   */
  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this._songService.updateById(id, request.payload);

    return {
      status: 'success',
      message: 'Song updated successfully',
    };
  }

  /**
   * Handles the request to delete a song by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and a message.
   */
  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._songService.deleteById(id);

    return {
      status: 'success',
      message: 'Song successfully deleted',
    };
  }
}

module.exports = SongHandler;
