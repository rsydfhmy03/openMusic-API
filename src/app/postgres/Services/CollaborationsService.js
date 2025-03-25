const BaseService = require('../../Base/Services/BaseService');
const InvariantError = require('../../exceptions/InvariantError');
const CollaborationsRepository = require('../Repository/CollaborationsRepository');

class CollaborationsService extends BaseService {
  constructor() {
    super(new CollaborationsRepository());
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${this.repository.nanoid()}`;
    return this.repository.create({ id, playlist_id: playlistId, user_id: userId });
  }

  async deleteCollaboration(playlistId, userId) {
    const collaborations = await this.repository.getAll({ playlist_id: playlistId, user_id: userId });

    if (!collaborations.length) {
      throw new InvariantError('Kolaborasi tidak ditemukan');
    }

    await this.repository.deleteById(collaborations[0].id);
  }

  async verifyCollaborator(playlistId, userId) {
    await this.repository.verifyCollaborator(playlistId, userId);
  }
}

module.exports = CollaborationsService;
