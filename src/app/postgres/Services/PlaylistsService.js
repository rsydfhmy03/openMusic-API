const BaseService = require('../../Base/Services/BaseService');
const NotFoundError = require('../../exceptions/NotFoundError');
const PlaylistsRepository = require('../Repository/PlaylistsRepository');

class PlaylistsService extends BaseService {
  constructor(collaborationsService) {
    super(new PlaylistsRepository());
    this._collaborationsService = collaborationsService;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${this.repository.nanoid()}`;
    return this.repository.create({ id, name, owner });
  }

  async getPlaylists(userId) {
    return this.repository.getPlaylists(userId);
  }

  async getPlaylistById(playlistId) {
    const playlist = await this.repository.getById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    return playlist;
  }

  async deletePlaylistById(id) {
    await this.getPlaylistById(id);
    await this.repository.deleteById(id);
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `song_playlist-${this.repository.nanoid()}`;
    await this.repository.create({ id, playlist_id: playlistId, song_id: songId }, 'playlist_songs');
  }

  async getPlaylistSongsById(playlistId, userId) {
    await this.verifyPlaylistAccess(playlistId, userId);
    const playlist = await this.getPlaylistById(playlistId);
    const songs = await this.repository.getPlaylistSongsById(playlistId);

    return {
      id: playlist.id, name: playlist.name, username: playlist.username, songs,
    };
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    await this.repository.deleteWhere({ playlist_id: playlistId, song_id: songId }, 'playlist_songs');
  }

  async getPlaylistActivitiesById(playlistId) {
    await this.getPlaylistById(playlistId);

    const query = {
      text: `SELECT u.username, s.title, a.action, a.time
             FROM playlist_song_activities a
             INNER JOIN songs s ON a.song_id = s.id
             INNER JOIN users u ON a.user_id = u.id
             WHERE a.playlist_id = $1
             ORDER BY a.time ASC`,
      values: [playlistId],
    };

    const { rows } = await this.repository.pool.query(query);
    return rows;
  }

  async addActivity(playlistId, songId, userId, action) {
    const id = `activity-${this.repository.nanoid()}`;
    const time = new Date().toISOString();

    await this.repository.create(
      {
        id, playlist_id: playlistId, song_id: songId, user_id: userId, action, time,
      },
      'playlist_song_activities',
    );
  }

  async verifyPlaylistOwner(id, userId) {
    await this.repository.verifyPlaylistOwner(id, userId);
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      try {
        await this._collaborationsService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistsService;
