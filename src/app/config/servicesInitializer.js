const AlbumsService = require('../postgres/Services/AlbumService');
const SongsService = require('../postgres/Services/SongService');
const UserService = require('../postgres/Services/UserService');
const AuthenticationsService = require('../postgres/Services/AuthenticationsService ');
const TokenManager = require('../tokenize/tokenManager');
const PlaylistsService = require('../postgres/Services/PlaylistsService');
const CollaborationsService = require('../postgres/Services/CollaborationsService');
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
  const playlistsService = new PlaylistsService();
  const collaborationsService = new CollaborationsService();
  return {
    albumsService,
    songsService,
    userService,
    authenticationsService,
    tokenManager,
    playlistsService,
    collaborationsService,
  };
};

module.exports = initServices;
