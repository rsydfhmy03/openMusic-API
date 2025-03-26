const BaseService = require('../../Base/Services/BaseService');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const NotFoundError = require('../../exceptions/NotFoundError');
const PlaylistsRepository = require('../Repository/PlaylistsRepository');

class PlaylistsService extends BaseService {
  constructor(collaborationsService) {
    super(new PlaylistsRepository());
    this._collaborationsService = collaborationsService;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${this.repository.nanoid()}`;
    return this.repository.createPlaylist({ id, name, owner });
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
    await this.repository.addSongToPlaylist(playlistId, songId);
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
    return this.repository.getPlaylistActivitiesById(playlistId);
  }

  async addActivity(playlistId, songId, userId, action) {
    const id = `activity-${this.repository.nanoid()}`;
    const time = new Date().toISOString();

    await this.repository.addActivity({
      id,
      playlist_id: playlistId,
      song_id: songId,
      user_id: userId,
      action,
      time,
    });
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

      try {
        await this._collaborationsService.verifyCollaborator(playlistId, userId);
      } catch {
        throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
      }
    }
  }
}

module.exports = PlaylistsService;
