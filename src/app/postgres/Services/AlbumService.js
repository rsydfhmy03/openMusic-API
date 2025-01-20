// import BaseService from '../../Base/Services/BaseService';
const BaseService = require('../../Base/Services/BaseService');
const albumRepository = require('../Repository/AlbumRepository');

class AlbumService extends BaseService {
  constructor() {
    super(new albumRepository());
  }

  async getAlbumWithSongs(albumId) {
    return this.repository.getAlbumWithSongs(albumId);
  }
}

module.exports = AlbumService;
