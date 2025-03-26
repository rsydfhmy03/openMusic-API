/* eslint-disable no-undef */
const autoBind = require('auto-bind');
const InvariantError = require('../../app/exceptions/InvariantError');

class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;
    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({
      name,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  //   async postPlaylistSongByIdHandler(request, h) {
  //     this._validator.validateSongPlaylistPayload(request.payload);

  //     const { songId } = request.payload;
  //     await this._songsService.getById(songId);

  //     const { id: playlistId } = request.params;
  //     const { id: credentialId } = request.auth.credentials;
  //     await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
  //     console.log('🔵 Debug: Menambahkan lagu ke playlist:', { playlistId, songId });

  //     await this._playlistsService.addSongToPlaylist(playlistId, songId);
  //     await this._playlistsService.addActivity(playlistId, songId, credentialId, 'add');

  //     const response = h.response({
  //       status: 'success',
  //       message: 'Musik berhasil ditambahkan ke dalam playlist',
  //     });
  //     response.code(201);
  //     return response;
  //   }
  async postPlaylistSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPlaylistPayload(request.payload);

      const { songId } = request.payload;
      await this._songsService.getById(songId);

      const { id: playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      console.log('🔵 Debug: Menambahkan lagu ke playlist:', { playlistId, songId });

      await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
      await this._playlistsService.addSongToPlaylist(playlistId, songId);
      await this._playlistsService.addActivity(playlistId, songId, credentialId, 'add');

      const response = h.response({
        status: 'success',
        message: 'Musik berhasil ditambahkan ke dalam playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      console.error('🔴 Debug: Error di postPlaylistSongByIdHandler:', error);

      if (error instanceof InvariantError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(400);
        return response;
      }

      throw error;
    }
  }

  async getPlaylistSongsByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const playlist = await this._playlistsService.getPlaylistSongsById(id, credentialId);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongsByIdHandler(request) {
    this._validator.validateSongPlaylistPayload(request.payload);

    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);
    console.log('🔵 Debug: Menghapus lagu dari playlist:', { playlistId: id, songId });
    await this._playlistsService.deleteSongFromPlaylist(id, songId);
    await this._playlistsService.addActivity(id, songId, credentialId, 'delete');

    return {
      status: 'success',
      message: 'Musik berhasil dihapus dari playlist',
    };
  }

  async getPlaylistActivitiesByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    const activities = await this._playlistsService.getPlaylistActivitiesById(id);

    return {
      status: 'success',
      data: {
        playlistId: id,
        activities,
      },
    };
  }
}

module.exports = PlaylistsHandler;
