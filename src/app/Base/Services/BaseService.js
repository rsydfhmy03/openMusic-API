/**
 * BaseService is a generic service class that provides common methods for interacting with a data repository.
 * It allows performing CRUD (Create, Read, Update, Delete) operations on the underlying repository.
 * 
 * The service is initialized with a specific repository which is responsible for the actual data manipulation.
 * This class can be extended for more specific business logic or repository interactions.
 * 
 * @template T - The type of data handled by this service.
 */
class BaseService {
  /**
   * Creates an instance of BaseService.
   *
   * @param {BaseRepository} repository - An instance of BaseRepository used for interacting with the database.
   * This repository will handle the data operations for a specific table.
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Retrieves all data from the repository with optional filters.
   *
   * @param {Object} [filters={}] - A key-value object where keys are column names and values are the filter values.
   *   Filters are used to narrow down the query results. Default is an empty object (no filter).
   * @param {Array<string>} [columns=['*']] - A list of columns to select from the table. Default is all columns.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the filtered data.
   * @throws {NotFoundError} If no data is found that matches the filters.
   */
  async getAll(filters) {
    return this.repository.getAll(filters);
  }

  /**
   * Retrieves a single data entry by its ID.
   *
   * @param {string} id - The ID of the data entry to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the retrieved data object.
   * @throws {NotFoundError} If the data with the specified ID is not found.
   */
  async getById(id) {
    return this.repository.getById(id);
  }

  /**
   * Creates a new data entry in the table.
   *
   * @param {Object} data - A key-value object representing the data to be inserted. The keys correspond to
   *   the column names of the table and the values are the values to be inserted into the database.
   * @returns {Promise<string>} A promise that resolves to the ID of the newly created data entry.
   * @throws {ClientError} If there is an issue while inserting the data (e.g., validation or constraint violations).
   */
  async create(data) {
    return this.repository.create(data);
  }

  /**
   * Updates an existing data entry by its ID.
   *
   * @param {string} id - The ID of the data entry to update.
   * @param {Object} data - A key-value object representing the new values for the data. The keys should match
   *   the column names in the table.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   * @throws {NotFoundError} If no data is found with the specified ID.
   */
  async updateById(id, data) {
    return this.repository.updateById(id, data);
  }

  /**
   * Deletes a single data entry by its ID.
   *
   * @param {string} id - The ID of the data entry to delete.
   * @returns {Promise<void>} A promise that resolves when the data entry is deleted.
   * @throws {NotFoundError} If no data is found with the specified ID to delete.
   */
  async deleteById(id) {
    return this.repository.deleteById(id);
  }
}

module.exports = BaseService;
