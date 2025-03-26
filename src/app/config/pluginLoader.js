const albums = require('../../api/albums');
const songs = require('../../api/songs');
const users = require('../../api/users');
const authentications = require('../../api/authentications');
const playlists = require('../../api/playlists');
const collaborations = require('../../api/collaborations');

/**
 * Registers plugins to the Hapi server.
 *
 * @async
 * @param {Object} server - The Hapi server instance.
 * @param {Object} service - Object containing service instances.
 * @param {Object} validators - Object containing validator instances.
 * @returns {Promise<void>} Resolves when all plugins are registered.
 *
 */
const registerPlugins = async (server, service, validators) => {
  await server.register([

    {
      plugin: albums,
      options: {
        service: service.albumsService,
        validator: validators.AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: service.songsService,
        validator: validators.SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: service.userService,
        validator: validators.UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService: service.authenticationsService,
        usersService: service.userService,
        tokenManager: service.tokenManager,
        validator: validators.AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService: service.playlistsService,
        songsService: service.songsService,
        validator: validators.PlaylistsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService: service.collaborationsService,
        playlistsService: service.playlistsService,
        usersService: service.userService,
        validator: validators.CollaborationsValidator,
      },
    },
  ]);
};

module.exports = registerPlugins;
