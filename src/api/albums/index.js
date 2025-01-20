const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    console.log('Validator in Plugin:', validator);
    const albumsHandler = new AlbumsHandler(service, validator);
    server.route(routes(albumsHandler));
  },
};
