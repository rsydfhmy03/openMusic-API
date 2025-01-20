// import BaseService from '../../Base/Services/BaseService';
const BaseService = require('../../Base/Services/BaseService');

class SongService extends BaseService {
  constructor(songRepository) {
    super(songRepository);
  }

  async getSongsWithFilters(query) {
    const filters = ParseParamService.parseQueryParams(query);
    return this.repository.getAll(filters);
  }
}

module.exports = SongService;