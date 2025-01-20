/* eslint-disable no-unused-vars */
const { Pool } = require('pg');
const { customAlphabet } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

/**
 * Represents a generic repository for interacting with a PostgreSQL database table.
 * This class provides methods for basic CRUD operations such as creating, retrieving, updating, and deleting data.
 * It can be extended for specific repositories.
 * @class
 */
class BaseRepository {
  /**
   * Initializes the BaseRepository instance with the specified table name.
   * This instance is used for interacting with a specific table in the database.
   * @constructor
   * @param {string} tableName - The name of the table to be managed by this repository.
   */
  constructor(tableName) {
    this.tableName = tableName;
    this._pool = new Pool();
    this.nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  }

  /**
   * Retrieves all data from the table, optionally filtered by specified criteria.
   * 
   * @async
   * @param {Object} [filters={}] - A key-value object where the keys are column names and the values are the filter values.
   * @param {Array<string>} [columns=['*']] - An array of columns to retrieve. Defaults to all columns.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the filtered data.
   * @throws {NotFoundError} - If no data matches the given filter.
   */
  async getAll(filters = {}, columns = ['*']) {
    const selectedColumns = columns.join(', ');
    const whereClauses = Object.entries(filters)
      .map(([key, value], idx) => `"${key}" ILIKE $${idx + 1}`)
      .join(' AND ');

    const params = Object.values(filters).map((val) => `%${val}%`);

    const sql = `
      SELECT ${selectedColumns}
      FROM ${this.tableName}
      ${whereClauses ? `WHERE ${whereClauses}` : ''}
    `;

    const result = await this._pool.query(sql, params);

    if (result.rows.length === 0) {
      throw new NotFoundError('Data is not found with the given filter');
    }

    return result.rows;
  }

  /**
   * Retrieves a single data entry by its ID.
   * 
   * @async
   * @param {string} id - The ID of the data to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to the object representing the retrieved data.
   * @throws {NotFoundError} - If no data is found with the given ID.
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
   * @async
   * @param {Object} data - A key-value object of data to be inserted into the table.
   * @returns {Promise<string>} - A promise that resolves to the ID of the newly created data.
   * @throws {ClientError} - If there is an error during data insertion.
   */
  async create(data) {
    try {
      if (!data.id) {
        data.id = `${this.tableName}-${this.nanoid()}`;
      }

      const keys = Object.keys(data);
      const values = Object.values(data);

      const columns = keys.map((key) => `"${key}"`).join(', ');
      const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');

      const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING id`;

      const result = await this._pool.query(sql, values);
      return result.rows[0].id;
    } catch (error) {
      throw new ClientError(error.message);
    }
  }

  /**
   * Updates a single data entry by its ID.
   * 
   * @async
   * @param {string} id - The ID of the data entry to update.
   * @param {Object} data - A key-value object of data to be updated.
   * @throws {NotFoundError} - If no data is found with the given ID.
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
   * Deletes a single data entry by its ID.
   * 
   * @async
   * @param {string} id - The ID of the data entry to delete.
   * @throws {NotFoundError} - If no data is found with the given ID.
   */
  async deleteById(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = $1`;
    const result = await this._pool.query(sql, [id]);

    if (result.rowCount === 0) throw new NotFoundError(`Data with ID ${id} not found`);
  }
}

module.exports = BaseRepository;
