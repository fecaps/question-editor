'use strict'

const {
  getAmountOfRows,
  getAmountOfRowsDeleted,
  getAmountOfColumns,
  getAmountOfColumnsDeleted,

  defineAmountOfItems,
  defineLongestRowString,
  defineLongestColumnString,
  defineShortestRowString,
  defineShortestColumnString,
  defineAmountOfImages
} = require('../models')

const selectStatistics = async (req, res) => {
  const rows = await getAmountOfRows()
    .then(result => result)
    .catch(err => Promise.reject(err))

  const rowsDeleted = await getAmountOfRowsDeleted()
    .then(result => result)
    .catch(err => Promise.reject(err))

  const columns = await getAmountOfColumns()
    .then(result => result)
    .catch(err => Promise.reject(err))

  const columnsDeleted = await getAmountOfColumnsDeleted()
    .then(result => result)
    .catch(err => Promise.reject(err))

  const amountOfRows = defineAmountOfItems(rows, rowsDeleted)
  const amountOfColumns = defineAmountOfItems(columns, columnsDeleted)
  const lengthOfLongestColumnString = await defineLongestColumnString()
  let lengthOfShortestColumnString = await defineShortestColumnString()

  if (!lengthOfShortestColumnString) {
    lengthOfShortestColumnString = lengthOfLongestColumnString
  }

  const lengthOfLongestRowString = await defineLongestRowString()
  let lengthOfShortestRowString = await defineShortestRowString()

  if (!lengthOfShortestRowString) {
    lengthOfShortestRowString = lengthOfLongestRowString
  }

  const amountOfImages = await defineAmountOfImages()

  const result = {
    amountOfRows,
    amountOfColumns,
    lengthOfLongestColumnString,
    lengthOfLongestRowString,
    lengthOfShortestColumnString,
    lengthOfShortestRowString,
    amountOfImages
  }

  return res.status(200).json({ result })
}

module.exports = {
  selectStatistics
}
