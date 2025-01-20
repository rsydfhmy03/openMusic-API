const autoBind = require('auto-bind');

/**
 * Handler class for managing album operations.
 * This class is used to handle requests such as adding, retrieving, updating, and deleting albums.
 * @class
 */
class AlbumHandler {
  /**
   * Initializes the AlbumHandler instance.
   * @param {Object} albumService - The service layer for album operations.
   * @param {Object} validator - The validator used to validate album payloads.
   */
  constructor(albumService, validator) {
    this._albumService = albumService;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Handles the request to add a new album.
   * @async
   * @param {Object} request - The Hapi request object.
   * @param {Object} h - The Hapi response toolkit.
   * @returns {Object} The response object containing success status and album ID.
   */
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const albumId = await this._albumService.create(request.payload);
    const response = h.response({
      status: 'success',
      message: 'Album added successfully',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  /**
   * Handles the request to retrieve an album by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and album data.
   */
  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._albumService.getById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  /**
   * Handles the request to update an album by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and a message.
   */
  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._albumService.updateById(id, request.payload);

    return {
      status: 'success',
      message: 'Album updated successfully',
    };
  }

  /**
   * Handles the request to delete an album by its ID.
   * @async
   * @param {Object} request - The Hapi request object.
   * @returns {Object} The response object containing success status and a message.
   */
  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._albumService.deleteById(id);

    return {
      status: 'success',
      message: 'Album successfully deleted',
    };
  }
}

module.exports = AlbumHandler;
