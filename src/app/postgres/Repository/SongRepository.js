// import BaseRepository from '../../Base/Repository/BaseRepository';
const BaseRepository = require('../../Base/Repository/BaseRepository');

class SongRepository extends BaseRepository {
  /**
   * Initializes the SongRepository instance.
   */
  constructor() {
    super('songs');
  }
}

module.exports = SongRepository;