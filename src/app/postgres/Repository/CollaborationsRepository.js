const BaseRepository = require('../../Base/Repository/BaseRepository');
const InvariantError = require('../../exceptions/InvariantError');

class CollaborationsRepository extends BaseRepository {
  constructor() {
    super('collaborations');
  }

  async verifyCollaborator(playlistId, userId) {
    const result = await this.getAll({ playlist_id: playlistId, user_id: userId });

    if (result.length === 0) {
      throw new InvariantError('Kolaborasi gagal diverifikasi');
    }
  }
}

module.exports = CollaborationsRepository;
