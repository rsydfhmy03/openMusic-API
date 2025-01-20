const autoBind = require('auto-bind');

class SongHandler {
    constructor(songService, validator) {
        this._songService = songService;
        this._validator = validator;

        autoBind(this);
    }

    async postSongHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const songId = await this._songService.create(request.payload);
        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
              songId,
            },
          });
  
          response.code(201);
          return response;
    }

    async getSongsHandler(request) {
        const songs = await this._songService.getSongsWithFilters(request.query);
        return {
            status: 'success',
            data: {
              songs,
            },
          };
    }

    async getSongByIdHandler(request) {
        const { id } = request.params;
        const song = await this._songService.getSongWithAlbum(id);
        return {
            status: 'success',
            data: {
              song,
            },
          };
    }

    async putSongByIdHandler(request) {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;
        await this._songService.updateById(id, request.payload);
  
        return {
          status: 'success',
          message: 'Lagu berhasil diperbarui',
        };
    }

    async deleteSongByIdHandler(request) {
        const {id} = request.params;
        await this._songService.deleteById(id);

        return {
            status: 'success',
            message: 'Lagu berhasil dihapus',    
        };
    }

}

module.exports = SongHandler;