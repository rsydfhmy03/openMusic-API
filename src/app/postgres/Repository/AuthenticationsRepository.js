const BaseRepository = require('../../Base/Repository/BaseRepository');
const NotFoundError = require('../../exceptions/NotFoundError');

class AuthenticationsRepository extends BaseRepository {
  constructor() {
    super('authentications'); // Sesuaikan dengan nama tabel di database
  }

  async verifyRefreshToken(token) {
    const result = await this.getAll({ token });
    if (result.length === 0) {
      throw new NotFoundError('Refresh token tidak ditemukan');
    }
  }
}

module.exports = AuthenticationsRepository;
