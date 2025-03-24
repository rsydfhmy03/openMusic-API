const autoBind = require('auto-bind');

class UserHandler {
  constructor(userService, validator) {
    this._userService = userService;
    this._validator = validator;
    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const userId = await this._userService.addUser(request.payload);
    return h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: { userId },
    }).code(201);
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;
    const user = await this._userService.getUserById(id);
    return {
      status: 'success',
      data: { user },
    };
  }

  async getUsersByUsernameHandler(request) {
    const { username = '' } = request.query;
    const users = await this._userService.getUsersByUsername(username);
    return {
      status: 'success',
      data: { users },
    };
  }
}

module.exports = UserHandler;
