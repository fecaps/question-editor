'use strict'

const { promisify } = require('util')
const { getClient } = require('../redis')
const AMOUNT_OF_ROWS_KEY = 'amount_of_rows'
const AMOUNT_OF_ROWS_DELETED_KEY = 'amount_of_rows_deleted'
const DEFAULT_AMOUNT_OF_ROWS = 1

const getAmountOfRows = async () => {
  const redisClient = getClient()
  const getAsync = promisify(redisClient.get).bind(redisClient)

  return getAsync(AMOUNT_OF_ROWS_KEY)
    .then(result => result === null && result || Number(result))
    .catch(err => Promise.reject(err))
}

const setAmountOfRows = async (amount) => {
  const redisClient = getClient()
  const setAsync = promisify(redisClient.set).bind(redisClient)

  const value = amount === null
    ? DEFAULT_AMOUNT_OF_ROWS
    : Number(amount) + 1

  return setAsync(AMOUNT_OF_ROWS_KEY, value)
    .then(() => value)
    .catch(err => Promise.reject(err))
}

const defineCreateRowsData = (amountOfRows, amountOfColumns) => {
  const itemsToCreate = []
  for (let i = amountOfColumns; i > 0; i--) {
    itemsToCreate.push({ row: amountOfRows, column: i, content: null })
  }
  return itemsToCreate
}

const getAmountOfRowsDeleted = async () => {
  const redisClient = getClient()
  const getAsync = promisify(redisClient.get).bind(redisClient)

  return getAsync(AMOUNT_OF_ROWS_DELETED_KEY)
    .then(result => result === null && result || Number(result))
    .catch(err => Promise.reject(err))
}

const setAmountOfRowsDeleted = async (amount) => {
  const redisClient = getClient()
  const setAsync = promisify(redisClient.set).bind(redisClient)

  const value = amount === null ? 1 : Number(amount) + 1

  return setAsync(AMOUNT_OF_ROWS_DELETED_KEY, value)
    .then(() => value)
    .catch(err => Promise.reject(err))
}

module.exports = {
  getAmountOfRows,
  setAmountOfRows,
  defineCreateRowsData,
  getAmountOfRowsDeleted,
  setAmountOfRowsDeleted
}
