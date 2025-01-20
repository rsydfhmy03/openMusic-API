require('dotenv').config();

const createServer = require('./app/config/serverConfig');
const registerPlugins = require('./app/config/pluginLoader');
const initServices = require('./app/config/servicesInitializer');
const validators = require('./validators');

const init = async () => {
  const service = initServices();
  const server = await createServer();

//   await registerPlugins(server, service, validators);
await registerPlugins(server);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      const isClientError = response.isBoom && response.output.statusCode < 500;
      if (isClientError) {
        return h.response({
          status: 'fail',
          message: response.message,
        }).code(response.output.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      }).code(500);
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
