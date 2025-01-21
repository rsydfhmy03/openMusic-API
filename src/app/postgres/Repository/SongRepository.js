const BaseRepository = require('../../Base/Repository/BaseRepository');

/**
 * Represents a repository for managing songs.
 * This class extends the {@link BaseRepository} and provides specific implementations for song-related operations.
 * @class
 * @extends BaseRepository
 */
class SongRepository extends BaseRepository {
  /**
   * Creates an instance of SongRepository.
   * Initializes the repository for the 'songs' table.
   * @constructor
   */
  constructor() {
    super('songs');
  }
}

module.exports = SongRepository;
