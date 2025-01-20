// import BaseService from '../../Base/Services/BaseService';
const BaseService = require('../../Base/Services/BaseService');
const SongRepository = require('../Repository/SongRepository');
const ParseParamService = require('../../Base/Services/ParseParamService');

class SongService extends BaseService {
  constructor() {
    super(new SongRepository());
    this.FETCHED_ATTRIBUTE = ['id', 'title', 'performer']; 
  }

  async getSongsWithFilters(query) {
    const filters = ParseParamService.parseQueryParams(query);
    return this.repository.getAll(filters, this.FETCHED_ATTRIBUTE);
  }
}

module.exports = SongService;
