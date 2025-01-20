// import BaseService from '../../Base/Services/BaseService';
const BaseService = require('../../Base/Services/BaseService');
const AlbumRepository = require('../Repository/AlbumRepository');

class AlbumService extends BaseService {
  constructor() {
    super(new AlbumRepository());
  }

  async getAlbumWithSongs(albumId) {
    return this.repository.getAlbumWithSongs(albumId);
  }
}

module.exports = AlbumService;
