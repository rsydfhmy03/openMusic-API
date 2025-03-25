const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    usersService,
    tokenManager,
    validator,
  }) => {
    console.log('🟡 Debug: usersService di plugin:', usersService);
    console.log('🟢 Debug: usersService.verifyUserCredential:', typeof usersService.verifyUserCredential);

    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator,
    );
    console.log('🟢 Debug: authenticationsHandler._usersService:', typeof authenticationsHandler._usersService.verifyUserCredential);

    server.route(routes(authenticationsHandler));
  },
};
