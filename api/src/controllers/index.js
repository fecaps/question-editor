'use strict'

const { uniq, orderBy } = require('lodash')
const { QuestionsEditor } = require('../entities')

const {
  createRows,
  deleteRows,
  putRowsLabel,
  putRowsImage
} = require('./rows-controller')

const {
  createColumns,
  deleteColumns,
  putColumnsLabel,
  putColumnsImage
} = require('./columns-controller')

const { selectStatistics } = require('./statistics-controller')

const list = (req, res) => listData(req, res)

const listData = (req, res) => {
  return QuestionsEditor.find({ enabled: true, deleted: false })
    .then(result => {
      const response = {
        rows: uniq(
          orderBy(result, [ 'row', 'asc' ]).map(item => item.row)
        ),
        columns: uniq(
          orderBy(result, [ 'column', 'asc' ]).map(item => item.column)
        )
      }

      response.rowsLabel = response.rows.map(row =>
        result.find(item => item.row === row).rowLabel || null
      )

      response.columnsLabel = response.columns.map(column =>
        result.find(item => item.column === column).columnLabel || null
      )

      response.rowsImage = response.rows.map(row =>
        result.find(item => item.row === row).rowImage || null
      )

      response.columnsImage = response.columns.map(column =>
        result.find(item => item.column === column).columnImage || null
      )

      return response
    })
    .then(result => res.status(200).json({ result }))
    .catch(err => res.status(400).json({ err }))
}

module.exports = {
  list,

  createRows,
  deleteRows,
  putRowsLabel,
  putRowsImage,

  createColumns,
  deleteColumns,
  putColumnsLabel,
  putColumnsImage,

  selectStatistics
}
