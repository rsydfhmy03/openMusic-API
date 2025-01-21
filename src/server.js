require('dotenv').config();

const createServer = require('./app/config/serverConfig');
const registerPlugins = require('./app/config/pluginLoader');
const initServices = require('./app/config/servicesInitializer');
const validators = require('./validators');
const ClientError = require('./app/exceptions/ClientError');

/**
 * Initializes the server, registers plugins, and starts the application.
 *
 * @async
 * @returns {Promise<void>} Resolves when the server is started successfully.
 */
const init = async () => {
  const service = initServices();
  const server = await createServer();
  await registerPlugins(server, service, validators);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
