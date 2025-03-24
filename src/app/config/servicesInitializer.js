const AlbumsService = require('../postgres/Services/AlbumService');
const SongsService = require('../postgres/Services/SongService');
const UserService = require('../postgres/Services/UserService');
/**
 * Initializes and returns all service instances.
 *
 * @returns {Object} An object containing initialized service instances.
 *
 */
const initServices = () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const userService = new UserService();
  return {
    albumsService,
    songsService,
    userService,
  };
};

module.exports = initServices;
