const BaseRepository = require('../../Base/Repository/BaseRepository');
const AuthorizationError = require('../../exceptions/AuthorizationError');
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

    const { rows } = await this._pool.query(query);
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

    const { rows } = await this._pool.query(query);
    return rows;
  }

  async isSongInPlaylist(playlistId, songId) {
    const query = {
      text: 'SELECT id FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      values: [playlistId, songId],
    };

    const { rowCount } = await this._pool.query(query);
    return rowCount > 0;
  }

  async getPlaylistActivitiesById(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, a.action, a.time
             FROM playlist_song_activities a
             INNER JOIN songs s ON a.song_id = s.id
             INNER JOIN users u ON a.user_id = u.id
             WHERE a.playlist_id = $1
             ORDER BY a.time ASC`,
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }

  async addSongToPlaylist(playlistId, songId) {
    const isSongExists = await this.isSongInPlaylist(playlistId, songId);
    if (isSongExists) {
      throw new InvariantError('Lagu sudah ada di dalam playlist');
    }
    const id = `song_playlist-${(this.nanoid())}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvariantError('Musik gagal ditambahkan kedalam playlist');
    }
  }

  async verifyPlaylistOwner(id, userId) {
    const playlist = await this.getById(id);

    if (!playlist) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    if (playlist.owner !== userId) {
      throw new AuthorizationError('Anda tidak memiliki hak akses');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
    }
  }
}

module.exports = PlaylistsRepository;
