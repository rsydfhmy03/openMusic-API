const Joi = require('joi');

/**
 * Songs Payload Schema.
 * This module defines the validation schema for song payloads using Joi.
 *
 * @module SongsPayloadSchema
 */
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string().max(50),
});

module.exports = { SongPayloadSchema };
