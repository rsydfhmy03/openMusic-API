const BaseRepository = require('../../Base/Repository/BaseRepository');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsRepository extends BaseRepository {
  constructor() {
    super('playlists');
  }

  async getPlaylists(userId) {
    const query = {
      text: `
        SELECT p.id, p.name, u.username 
        FROM playlists AS p 
        INNER JOIN users AS u ON p.owner = u.id 
        WHERE p.owner = $1 
        UNION 
        SELECT p.id, p.name, u.username 
        FROM collaborations AS c 
        INNER JOIN playlists AS p ON c.playlist_id = p.id 
        INNER JOIN users u ON p.owner = u.id 
        WHERE c.user_id = $1`,
      values: [userId],
    };

    const { rows } = await this.pool.query(query);
    return rows;
  }

  async getPlaylistSongsById(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
             FROM songs s
             INNER JOIN playlist_songs p ON p.song_id = s.id
             WHERE p.playlist_id = $1`,
      values: [playlistId],
    };

    const { rows } = await this.pool.query(query);
    return rows;
  }

  async verifyPlaylistOwner(id, userId) {
    const playlist = await this.getById(id);

    if (!playlist) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    if (playlist.owner !== userId) {
      throw new InvariantError('Anda tidak memiliki hak akses');
    }
  }
}

module.exports = PlaylistsRepository;
