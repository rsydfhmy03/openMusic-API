const AlbumsService = require('../postgres/Services/AlbumService');
const SongsService = require('../postgres/Services/SongService');

/**
 * Initializes and returns all service instances.
 *
 * @returns {Object} An object containing initialized service instances.
 *
 */
const initServices = () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  return {
    albumsService,
    songsService,
  };
};

module.exports = initServices;
