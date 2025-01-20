class BaseService {
  /**
   * Creates an instance of BaseService.
   * @param {BaseRepository} repository - An instance of BaseRepository.
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Retrieves all data from the table with optional filters.
   *
   * @param {Object} [filters={}] - A key-value object of filters.
   * @returns {Promise<Array<Object>>} - An array of objects representing the filtered data.
   */
  async getAll(filters) {
    return this.repository.getAll(filters);
  }

  /**
   * Retrieves a single data by its ID.
   *
   * @param {string} id - The ID of the data to retrieve.
   * @returns {Promise<object>} The retrieved data.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async getById(id) {
    return this.repository.getById(id);
  }

  /**
   * Creates a new data entry in the table.
   *
   * @param {Object} data - A key-value object of data to be inserted.
   * @returns {Promise<string>} The ID of the newly created data.
   */

  async create(data) {
    console.log('Data Post !', this.repository);
    return this.repository.create(data);
  }

  /**
   * Updates a single data by its ID.
   *
   * @param {string} id - The ID of the data to update.
   * @param {Object} data - A key-value object of data to be updated.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async updateById(id, data) {
    return this.repository.updateById(id, data);
  }

  /**
   * Deletes a single data by its ID.
   *
   * @param {string} id - The ID of the data to delete.
   * @throws {NotFoundError} If the data with the given ID is not found.
   */
  async deleteById(id) {
    return this.repository.deleteById(id);
  }
}

module.exports = BaseService;
