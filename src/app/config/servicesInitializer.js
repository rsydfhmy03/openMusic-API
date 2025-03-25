const AlbumsService = require('../postgres/Services/AlbumService');
const SongsService = require('../postgres/Services/SongService');
const UserService = require('../postgres/Services/UserService');
const AuthenticationsService = require('../postgres/Services/AuthenticationsService ');
const TokenManager = require('../tokenize/tokenManager');
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
  const authenticationsService = new AuthenticationsService();
  const tokenManager = TokenManager;
  console.log('🟢 Debug userService:', userService); // Debugging userService
  return {
    albumsService,
    songsService,
    userService,
    authenticationsService,
    tokenManager,
  };
};

module.exports = initServices;
