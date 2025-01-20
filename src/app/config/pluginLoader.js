const albums = require('../../api/albums');
const albumsService = require('../postgres/Services/AlbumService');
const AlbumsValidator = require('../../validators/albums');

const songs = require('../../api/songs');
const songsService = require('../postgres/Services/SongService');
const SongsValidator = require('../../validators/songs');
// const albumsService = new albumsService();
// const songsService = new songsService();
const registerPlugins = async (server) => {
    
    
  await server.register([
    {
      plugin: albums,
      options: {
        service: new albumsService(),
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: new songsService(),
        validator: SongsValidator,
      },
    },
  ]);
};

module.exports = registerPlugins;
