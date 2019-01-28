'use strict'

const PORT = process.env.PORT || 3000

/**
 * @description Mongo definitions
 */
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'question_editor'

/**
 * @description Redis definitions
 */
const REDIS_HOST = process.env.REDIS_HOST || 'redis://localhost'
const REDIS_PORT = process.env.REDIS_PORT || 6379

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_DATABASE,
  REDIS_HOST,
  REDIS_PORT
}
