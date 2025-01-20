const albums = require('../../api/albums');
const albumsService = require('../postgres/Services/AlbumService');
const AlbumsValidator = require('../../validators/albums');

const songs = require('../../api/songs');
const songsService = require('../postgres/Services/SongService');
const SongsValidator = require('../../validators/songs');
// const albumsService = new albumsService();
// const songsService = new songsService();
const registerPlugins = async (server, service, validators) => {
  console.log('Albums Validator:', validators.AlbumsValidator);
  await server.register([

    {
      plugin: albums,
      options: {
        // service: new albumsService(),
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
  console.log('Plugin loaded', server.register);
};

module.exports = registerPlugins;
