const autoBind = require('auto-bind');
// const { nanoid } = require('nanoid');
class AlbumHandler {
    constructor(albumService, validator) {
        this._albumService = albumService;
        this._validator = validator;

        autoBind(this);
    }

    async postAlbumHandler(request, h) {
        console.log(request.payload);
        console.log(this._validator, "ini validator");
        this._validator.validateAlbumPayload(request.payload);
        console.log("PASS")
        console.log("pass");
        const albumId = await this._albumService.create(request.payload);
        console.log(albumId);
        const response = h.response({
            status: 'success',
            message: 'Album berhasil ditambahkan',
            data: {
              albumId,
            },
          });
      
          response.code(201);
          return response;
    }

    async getAlbumByIdHandler(request) {
        const {id } = request.params;
        const album = await this._albumService.getAlbumWithSongs(id);
        return {
            status: 'success',
            data: {
              album,
            },
          };
    }

    async putAlbumByIdHandler(request) {
        this._validator.validateAlbumPayload(request.payload);
        const { id } = request.params;
        await this._albumService.updateById(id, request.payload);
      
        return {
          status: 'success',
          message: 'Album berhasil diperbarui',
        };
      }

      async deleteAlbumByIdHandler(request) {
        const {id} = request.params;
        await this._albumService.deleteById(id);
      
        return {
          status: 'success',
          message: 'Album berhasil dihapus',
        };
      }
}

module.exports = AlbumHandler;
