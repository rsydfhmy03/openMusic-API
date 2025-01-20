// import BaseRepository from '../../Base/Repository/BaseRepository';
const BaseRepository = require('../../Base/Repository/BaseRepository');

class AlbumRepository extends BaseRepository {
  /**
     * Creates an instance of AlbumRepository.
     */
  constructor() {
    super('albums');
  }

  /**
     * Retrieves an album along with its associated songs.
     *
     * @param {string} albumId - The ID of the album to retrieve.
     * @returns {Promise<object>} The album data with an array of its songs.
     * @throws {Error} If the album with the given ID is not found.
     */
  async getAlbumWithSongs(albumId) {
    // Mengambil album berdasarkan ID
    const album = await this.getById(albumId);

    // Mengambil daftar lagu yang terkait dengan album tersebut
    const sql = `
            SELECT id, title, performer 
            FROM songs 
            WHERE album_id = $1
        `;
    const result = await this._pool.query(sql, [albumId]);

    // Menambahkan daftar lagu ke objek album
    return { ...album, songs: result.rows };
  }
}

module.exports = AlbumRepository;