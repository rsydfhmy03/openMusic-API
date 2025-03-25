const albums = require('../../api/albums');
const songs = require('../../api/songs');
const users = require('../../api/users');
const authentications = require('../../api/authentications');

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
  console.log('🟡 Debug: registerPlugins service:', service);
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
  ]);
};

module.exports = registerPlugins;
