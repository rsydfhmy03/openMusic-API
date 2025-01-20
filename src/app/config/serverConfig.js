const Hapi = require('@hapi/hapi');

const config = require('./appConfig');

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
