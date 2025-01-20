const albums = require('../../api/albums');
const songs = require('../../api/songs');

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
  ]);
};

module.exports = registerPlugins;
