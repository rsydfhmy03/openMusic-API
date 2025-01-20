const albums = require('../../api/albums');
const songs = require('../../api/songs');

const registerPlugins = async (server, service, validators) => {
  console.log('Albums Validator:', validators.AlbumsValidator);
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
