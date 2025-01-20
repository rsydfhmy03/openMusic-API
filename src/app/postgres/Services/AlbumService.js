const BaseService = require('../../Base/Services/BaseService');
const AlbumRepository = require('../Repository/AlbumRepository');

/**
 * Represents a service that manages album-related operations.
 * This class provides the business logic for retrieving album data and associated songs.
 * It extends {@link BaseService} and utilizes the {@link AlbumRepository} for data access.
 * @class
 * @extends BaseService
 */
class AlbumService extends BaseService {
  /**
   * Creates an instance of AlbumService.
   * Initializes the service with an instance of {@link AlbumRepository} for data access.
   * @constructor
   */
  constructor() {
    super(new AlbumRepository());
  }
  
  /**
   * Retrieves an album and its associated songs.
   * @async
   * @param {string} albumId - The ID of the album to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to an object containing album data and its songs.
   * @throws {NotFoundError} - Throws an error if the album with the given ID does not exist.
   */
  async getAlbumWithSongs(albumId) {
    return this.repository.getAlbumWithSongs(albumId);
  }
}

module.exports = AlbumService;
