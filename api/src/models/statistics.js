'use strict'

const { uniq, get } = require('lodash')
const { QuestionsEditor } = require('../entities')

const defineAmountOfItems = (items, itemsDeleted) => {
  if (!itemsDeleted) return items

  if (Number(items) - Number(itemsDeleted) < 0) return 0

  return Number(items) - Number(itemsDeleted)
}

const defineLongestRowString = async () => {
  return QuestionsEditor
    .findOne({ enabled: true, deleted: false })
    .sort('-rowLabelLength')
    .exec()
    .then(result => get(result, 'rowLabelLength', 0))
    .catch(err => err)
}

const defineLongestColumnString = async () => {
  return QuestionsEditor
    .findOne({ enabled: true, deleted: false })
    .sort('-columnLabelLength')
    .exec()
    .then(result => get(result, 'columnLabelLength', 0))
    .catch(err => err)
}

const defineShortestRowString = async () => {
  return QuestionsEditor
    .findOne({ enabled: true, deleted: false })
    .sort('rowLabelLength')
    .exec()
    .then(result => get(result, 'rowLabelLength', 0))
    .catch(err => err)
}

const defineShortestColumnString = async () => {
  return QuestionsEditor
    .findOne({ enabled: true, deleted: false })
    .sort('columnLabelLength')
    .exec()
    .then(result => get(result, 'columnLabelLength', 0))
    .catch(err => err)
}

const defineAmountOfImages = () => {
  return QuestionsEditor.find({ enabled: true, deleted: false })
    .distinct('rowImage')
    .exec()
    .then(rowResults => {
      return QuestionsEditor.find({ enabled: true, deleted: false })
        .distinct('columnImage')
        .exec()
        .then(columnResults => {
          return uniq([ ...rowResults, ...columnResults ]).length
        })
        .catch(err => err)
    })
    .then(result => result)
    .catch(err => err)
}

module.exports = {
  defineAmountOfItems,
  defineLongestRowString,
  defineLongestColumnString,
  defineShortestRowString,
  defineShortestColumnString,
  defineAmountOfImages
}
