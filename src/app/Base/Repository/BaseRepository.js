const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');
const { customAlphabet } = require('nanoid');
class BaseRepository {
  /**
   * Initializes the BaseRepository instance.
   *
   * @param {string} tableName - The name of the table to be managed.
   */
  constructor(tableName) {
    this.tableName = tableName;
    this._pool = new Pool();
    this.nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  }

  /**
   * Retrieves all data from the table with optional filters.
   *
   * @param {Object} [filters={}] - A key-value object of filters.
   * @returns {Promise<Array<Object>>} - An array of objects representing the filtered data.
   */
  async getAll(filters = {}) {
    const whereClauses = Object.entries(filters)
      .map(([key, value], idx) => `"${key}" = $${idx + 1}`)
      .join(' AND ');

    const sql = `SELECT * FROM ${this.tableName}${whereClauses ? ` WHERE ${whereClauses}` : ''}`;
    const params = Object.values(filters);

    const result = await this._pool.query(sql, params);
    return result.rows;
  }

  /**
   * Retrieves a single data by its ID.
   *
   * @param {string} id - The ID of the data to retrieve.
   * @returns {Promise<object>} The retrieved data.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async getById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await this._pool.query(sql, [id]);

    if (result.rows.length === 0) throw new NotFoundError(`Data with ID ${id} not found`);
    return result.rows[0];
  }

  /**
   * Creates a new data entry in the table.
   *
   * @param {Object} data - A key-value object of data to be inserted.
   * @returns {Promise<string>} The ID of the newly created data.
   */
  async create(data) {
    try {

        if (!data.id) {
          data.id = `${this.tableName}-${this.nanoid()}`;
        }
  
        console.log(data, 'data');
        const keys = Object.keys(data);
        const values = Object.values(data);
  
        const columns = keys.map((key) => `"${key}"`).join(', ');
        const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');
        console.log(this.tableName, 'table');
  
        const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING id`;
        console.log(sql, 'sql');
  
        const result = await this._pool.query(sql, values);
        console.log(result, 'result');
        return result.rows[0].id;
      } catch (error) {
        console.error('Database error:', error.message);
        throw new ClientError(error.message);
      }
  }
  

  /**
   * Updates a single data by its ID.
   *
   * @param {string} id - The ID of the data to update.
   * @param {Object} data - A key-value object of data to be updated.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async updateById(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClauses = keys.map((key, idx) => `"${key}" = $${idx + 2}`).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${setClauses} WHERE id = $1`;

    const result = await this._pool.query(sql, [id, ...values]);

    if (result.rowCount === 0) throw new NotFoundError(`Data with ID ${id} not found`);
  }

  /**
   * Deletes a single data by its ID.
   *
   * @param {string} id - The ID of the data to delete.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async deleteById(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = $1`;
    const result = await this._pool.query(sql, [id]);

    if (result.rowCount === 0) throw new NotFoundError(`Data with ID ${id} not found`);
  }
}

module.exports = BaseRepository;
