'use strict'

const {
  getAmountOfColumns,
  setAmountOfColumns,
  defineCreateColumnsData,
  getAmountOfColumnsDeleted,
  setAmountOfColumnsDeleted
} = require('./columns')

const {
  getAmountOfRows,
  setAmountOfRows,
  defineCreateRowsData,
  getAmountOfRowsDeleted,
  setAmountOfRowsDeleted
} = require('./rows')

const {
  defineAmountOfItems,
  defineLongestRowString,
  defineLongestColumnString,
  defineShortestRowString,
  defineShortestColumnString,
  defineAmountOfImages
} = require('./statistics')

module.exports = {
  getAmountOfColumns,
  setAmountOfColumns,
  defineCreateColumnsData,
  getAmountOfColumnsDeleted,
  setAmountOfColumnsDeleted,

  getAmountOfRows,
  setAmountOfRows,
  defineCreateRowsData,
  getAmountOfRowsDeleted,
  setAmountOfRowsDeleted,

  defineAmountOfItems,
  defineLongestRowString,
  defineLongestColumnString,
  defineShortestRowString,
  defineShortestColumnString,
  defineAmountOfImages
}
