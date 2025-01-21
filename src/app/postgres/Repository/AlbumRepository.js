const BaseRepository = require('../../Base/Repository/BaseRepository');
const NotFoundError = require('../../exceptions/NotFoundError');

/**
 * Represents a repository for managing albums.
 * This class extends the {@link BaseRepository} and provides specific implementations for album-related operations.
 * @class
 * @extends BaseRepository
 */
class AlbumRepository extends BaseRepository {
  /**
   * Creates an instance of AlbumRepository.
   * @constructor
   */
  constructor() {
    super('albums');
  }

  /**
   * Retrieves an album by its ID along with its associated songs.
   * This method overrides the `getById` method from the `BaseRepository` class to provide more specific functionality
   * for retrieving album details, including related songs.
   *
   * @param {string} id - The ID of the album to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to an album object, which includes album details and its associated songs.
   * @throws {NotFoundError} - If no album is found with the given ID.
   */
  async getById(id) {
    const albumQuery = `
      SELECT id, name, year
      FROM albums
      WHERE id = $1
    `;

    const songQuery = `
      SELECT id, title, performer
      FROM songs
      WHERE "albumId" = $1
    `;
    const albumResult = await this._pool.query(albumQuery, [id]);
    if (albumResult.rows.length === 0) throw new NotFoundError(`Album with ID ${id} not found`);

    const songsResult = await this._pool.query(songQuery, [id]);

    const album = albumResult.rows[0];
    album.songs = songsResult.rows;

    return album;
  }
}

module.exports = AlbumRepository;
