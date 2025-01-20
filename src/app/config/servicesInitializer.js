const AlbumsService = require('../postgres/Services/AlbumService');
const SongsService = require('../postgres/Services/SongService');

const initServices = () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();

  return {
    albumsService,
    songsService,
  };
};

module.exports = initServices;
