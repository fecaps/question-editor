'use strict'

const { promisify } = require('util')
const { getClient } = require('../redis')
const AMOUNT_OF_COLUMNS_KEY = 'amount_of_columns'
const AMOUNT_OF_COLUMNS_DELETED_KEY = 'amount_of_columns_deleted'
const DEFAULT_AMOUNT_OF_COLUMNS = 1

const getAmountOfColumns = async () => {
  const redisClient = getClient()
  const getAsync = promisify(redisClient.get).bind(redisClient)

  return getAsync(AMOUNT_OF_COLUMNS_KEY)
    .then(result => result === null && result || Number(result))
    .catch(err => Promise.reject(err))
}

const setAmountOfColumns = async (amount) => {
  const redisClient = getClient()
  const setAsync = promisify(redisClient.set).bind(redisClient)

  const value = amount === null
    ? DEFAULT_AMOUNT_OF_COLUMNS
    : Number(amount) + 1

  return setAsync(AMOUNT_OF_COLUMNS_KEY, value)
    .then(() => value)
    .catch(err => Promise.reject(err))
}

const defineCreateColumnsData = (amountOfColumns, amountOfRows) => {
  const itemsToCreate = []
  for (let i = amountOfRows; i > 0; i--) {
    itemsToCreate.push({ row: i, column: amountOfColumns, content: null })
  }
  return itemsToCreate
}

const getAmountOfColumnsDeleted = async () => {
  const redisClient = getClient()
  const getAsync = promisify(redisClient.get).bind(redisClient)

  return getAsync(AMOUNT_OF_COLUMNS_DELETED_KEY)
    .then(result => result === null && result || Number(result))
    .catch(err => Promise.reject(err))
}

const setAmountOfColumnsDeleted = async (amount) => {
  const redisClient = getClient()
  const setAsync = promisify(redisClient.set).bind(redisClient)

  const value = amount === null ? 1 : Number(amount) + 1

  return setAsync(AMOUNT_OF_COLUMNS_DELETED_KEY, value)
    .then(() => value)
    .catch(err => Promise.reject(err))
}

module.exports = {
  getAmountOfColumns,
  setAmountOfColumns,
  defineCreateColumnsData,
  getAmountOfColumnsDeleted,
  setAmountOfColumnsDeleted
}
