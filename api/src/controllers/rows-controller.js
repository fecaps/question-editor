'use strict'

const Joi = require('joi')
const { QuestionsEditor } = require('../entities')
const {
  getAmountOfRows,
  setAmountOfRows,
  defineCreateRowsData,
  getAmountOfRowsDeleted,
  setAmountOfRowsDeleted,

  getAmountOfColumns,
  setAmountOfColumns
} = require('../models')

const createRows = async (req, res) => {
  const amountOfRows = await getAmountOfRows()
    .then(result => setAmountOfRows(result))
    .then(result => result)
    .catch(err => Promise.reject(err))

  const amountOfColumns = await getAmountOfColumns()
    .then(async result => {
      if (result) return result
      const amount = await setAmountOfColumns(result)
      return amount
    })
    .then(result => result)
    .catch(err => Promise.reject(err))

  const createData = defineCreateRowsData(amountOfRows, amountOfColumns)

  QuestionsEditor.create(createData)
    .then(result => {
      return res.status(201).json({ result })
    })
    .catch(error => {
      return res.json(500).json({ error })
    })
}

const deleteRows = async (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('row value')
  }

  return Joi.validate(
    req.params, schema, { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        row: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { row: result.value },
            { $set: { enabled: false, deleted: true } }
          )
            .then(async () => {
              const currentAmount = await getAmountOfRowsDeleted()
              await setAmountOfRowsDeleted(currentAmount)
              return currentAmount
            })
            .catch(err => err)
        })
        .catch(err => err)

      return Promise.resolve()
    })
    .then(() => res.status(200).json({ deleted: true }))
    .catch(err => res.status(400).json({
      errors: err.details || err.message || err
    }))
}

const putRowsLabel = async (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('row value'),

    label: Joi.string()
      .required()
      .description('row label')
  }

  return Joi.validate(
    { ...req.params, ...req.body },
    schema,
    { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        row: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { row: result.value },
            { $set: {
              rowLabel: result.label,
              rowLabelLength: result.label.length
            } }
          )
        })
        .catch(err => err)

      return Promise.resolve(result)
    })
    .then(result => res.status(200).json({ result }))
    .catch(err => res.status(400).json({
      errors: err.details || err.message || err
    }))
}

const putRowsImage = (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('row value'),

    rowPicture: Joi.object()
      .required()
      .description('row picture')
  }

  return Joi.validate(
    { ...req.params, rowPicture: req.file },
    schema,
    { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        row: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { row: result.value },
            { $set: { rowImage: req.file.path } }
          )
        })
        .catch(err => err)

      return Promise.resolve(result)
    })
    .then(result => res.status(200).json({ result }))
    .catch(err => res.status(400).json({
      errors: err.details || err.message || err
    }))
}

module.exports = {
  createRows,
  deleteRows,
  putRowsLabel,
  putRowsImage
}
