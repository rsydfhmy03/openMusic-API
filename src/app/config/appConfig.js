/**
 * Application configuration.
 * This module provides configuration for the application, including host and port settings.
 * The values are loaded from environment variables.
 *
 * @module appConfig
 */
const AppConfig = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
};

module.exports = AppConfig;
