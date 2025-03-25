const BaseRepository = require('../../Base/Repository/BaseRepository');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsRepository extends BaseRepository {
  constructor() {
    super('authentications'); // Sesuaikan dengan nama tabel di database
  }

  async getAll(filters = {}, columns = ['*']) {
    const selectedColumns = columns.join(', ');
    const whereClauses = Object.entries(filters)
      .map(([key], idx) => `"${key}" ILIKE $${idx + 1}`)
      .join(' AND ');

    const params = Object.values(filters).map((val) => `%${val}%`);

    const sql = `
      SELECT ${selectedColumns}
      FROM ${this.tableName}
      ${whereClauses ? `WHERE ${whereClauses}` : ''}
    `;

    const result = await this._pool.query(sql, params);

    return result.rows;
  }

  async verifyRefreshToken(token) {
    const result = await this.getAll({ token });
    if (result.length === 0) {
      throw new InvariantError('Refresh token tidak valid', 400);
    }
  }
}

module.exports = AuthenticationsRepository;
