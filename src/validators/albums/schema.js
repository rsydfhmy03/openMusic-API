const Joi = require('joi');
/**
 * Album Payload Schema.
 * This module defines the validation schema for album payloads using Joi.
 *
 * @module AlbumPayloadSchema
 */
const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
});

module.exports = { AlbumPayloadSchema };
