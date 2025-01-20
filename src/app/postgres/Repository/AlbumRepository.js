const BaseRepository = require('../../Base/Repository/BaseRepository');
const NotFoundError = require('../../exceptions/NotFoundError')
class AlbumRepository extends BaseRepository {
  constructor() {
    super('albums');
  }

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
