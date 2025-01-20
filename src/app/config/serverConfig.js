const Hapi = require('@hapi/hapi');
const config = require('./appConfig');

/**
 * Creates a new Hapi server instance.
 *
 * @async
 * @returns {Promise<Object>} The Hapi server instance.
 *
 */
const createServer = async () => {
  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  return server;
};

module.exports = createServer;
