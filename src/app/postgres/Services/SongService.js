// import BaseService from '../../Base/Services/BaseService';
const BaseService = require('../../Base/Services/BaseService');
const songRepository = require('../Repository/SongRepository');
const ParseParamService = require('../../Base/Services/ParseParamService');

class SongService extends BaseService {
  constructor() {
    super(new songRepository());
  }

  async getSongsWithFilters(query) {
    const filters = ParseParamService.parseQueryParams(query);
    return this.repository.getAll(filters);
  }
}

module.exports = SongService;
