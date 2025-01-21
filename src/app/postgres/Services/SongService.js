const BaseService = require('../../Base/Services/BaseService');
const SongRepository = require('../Repository/SongRepository');
const ParseParamService = require('../../Base/Services/ParseParamService');

/**
 * Represents a service that manages song-related operations.
 * This class provides the business logic for retrieving songs with optional filters.
 * It extends {@link BaseService} and utilizes the {@link SongRepository} for data access.
 * @class
 * @extends BaseService
 */
class SongService extends BaseService {
  /**
   * Creates an instance of SongService.
   * Initializes the service with an instance of {@link SongRepository} for data access.
   * @constructor
   */
  constructor() {
    super(new SongRepository());
    this.FETCHED_ATTRIBUTE = ['id', 'title', 'performer'];
  }

  /**
   * Retrieves songs with optional filters based on query parameters.
   * The filter allows searching songs by their title or performer.
   * @async
   * @param {Object} query - The query parameters to filter the songs.
   * @param {string} query.title - The title to filter songs by (optional).
   * @param {string} query.performer - The performer to filter songs by (optional).
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of song objects matching the filters.
   */
  async getSongsWithFilters(query) {
    const allowedFields = ['title', 'performer'];
    const filters = ParseParamService.parseQueryParams(query, allowedFields);
    return this.repository.getAll(filters, this.FETCHED_ATTRIBUTE);
  }
}

module.exports = SongService;
