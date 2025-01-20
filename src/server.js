require('dotenv').config();

const createServer = require('./app/config/serverConfig');
const registerPlugins = require('./app/config/pluginLoader');
const initServices = require('./app/config/servicesInitializer');
const validators = require('./validators');
const ClientError = require('./app/exceptions/ClientError');

const init = async () => {
  const service = initServices();
  const server = await createServer();
  console.log('Validators:', validators.AlbumsValidator);
  await registerPlugins(server, service, validators);
  // await registerPlugins(server);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    // penanganan client error secara internal.
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
