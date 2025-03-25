const BaseService = require('../../Base/Services/BaseService');
const AuthenticationsRepository = require('../Repository/AuthenticationsRepository');
const NotFoundError = require('../../exceptions/NotFoundError');

class AuthenticationsService extends BaseService {
  constructor() {
    super(new AuthenticationsRepository());
  }

  /**
   * Menyimpan refresh token ke dalam database.
   * @param {string} token - Refresh token yang akan disimpan.
   * @returns {Promise<string>} ID dari token yang disimpan.
   */
  async addRefreshToken(token) {
    return this.create({ token });
  }

  async verifyRefreshToken(token) {
    return this.repository.verifyRefreshToken(token);
  }

  /**
   * Menghapus refresh token dari database.
   * @param {string} token - Refresh token yang akan dihapus.
   * @returns {Promise<void>}
   */
  async deleteRefreshToken(token) {
    const tokens = await this.repository.getAll({ token });
    if (tokens.length === 0) {
      throw new NotFoundError('Refresh token tidak ditemukan');
    }
    await this.repository.deleteById(tokens[0].id);
  }
}

module.exports = AuthenticationsService;
