const BaseService = require('../../Base/Services/BaseService');
const UserRepository = require('../Repository/UserRepository');
const InvariantError = require('../../exceptions/InvariantError');
/**
 * Represents a service that manages album-related operations.
 * This class provides the business logic for retrieving album data and associated songs.
 * It extends {@link BaseService} and utilizes the {@link UserRepository} for data access.
 * @class
 * @extends BaseService
 */
class UserService extends BaseService {
  /**
   * Creates an instance of AlbumService.
   * Initializes the service with an instance of {@link UserRepository} for data access.
   * @constructor
   */
  constructor() {
    super(new UserRepository());
  }

  async addUser(userData) {
    try {
      return await this.create(userData);
    } catch (error) {
      if (error instanceof InvariantError) {
        throw error;
      }
      throw new InvariantError('User gagal ditambahkan.');
    }
  }

  async getUserById(userId) {
    return this.findById(userId);
  }

  async getUsersByUsername(username) {
    return this.findAllByQuery(username);
  }

  async verifyUserCredential(username, password) {
    console.log('🔵 Debug: di fungsi verifyUserCredential', username);
    console.log('🔵 Debug: this._repository:', this.repository);

    if (!this.repository) {
      throw new Error('❌ this._repository tidak tersedia di UserService!');
    }

    if (typeof this.repository.verifyUserCredential !== 'function') {
      throw new Error('❌ this._repository.verifyUserCredential tidak ditemukan!');
    }

    return this.repository.verifyUserCredential(username, password);
  }
}

module.exports = UserService;
