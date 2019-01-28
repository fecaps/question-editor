'use strict'

const redis = require('redis')
const { REDIS_HOST, REDIS_PORT } = require('./definitions')

let client = null

const connect = () => {
  const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    redis_strategy: 1000
  })

  redisClient.on('error', (err) => console.log('Redis connection error:', err))

  redisClient.on('connect', () => {
    console.log('Redis client connected')
    client = redisClient
  })
}

const getClient = () => {
  return !client && connect() && client || client
}

module.exports = {
  connect,
  getClient
}
