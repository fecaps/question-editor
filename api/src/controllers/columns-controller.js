'use strict'

const Joi = require('joi')
const { QuestionsEditor } = require('../entities')
const {
  getAmountOfColumns,
  setAmountOfColumns,
  defineCreateColumnsData,
  getAmountOfColumnsDeleted,
  setAmountOfColumnsDeleted,

  getAmountOfRows,
  setAmountOfRows
} = require('../models')

const createColumns = async (req, res) => {
  const amountOfColumns = await getAmountOfColumns()
    .then(result => setAmountOfColumns(result))
    .then(result => result)
    .catch(err => Promise.reject(err))

  const amountOfRows = await getAmountOfRows()
    .then(async result => {
      if (result) return result
      const amount = await setAmountOfRows(result)
      return amount
    })
    .then(result => result)
    .catch(err => Promise.reject(err))

  const createData = defineCreateColumnsData(amountOfColumns, amountOfRows)

  QuestionsEditor.create(createData)
    .then(result => {
      return res.status(201).json({ result })
    })
    .catch(error => {
      return res.json(500).json({ error })
    })
}

const deleteColumns = async (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('column value')
  }

  return Joi.validate(
    req.params, schema, { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        column: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { column: result.value },
            { $set: { enabled: false, deleted: true } }
          )
            .then(async () => {
              const currentAmount = await getAmountOfColumnsDeleted()
              await setAmountOfColumnsDeleted(currentAmount)
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

const putColumnsLabel = async (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('column value'),

    label: Joi.string()
      .required()
      .description('column label')
  }

  return Joi.validate(
    { ...req.params, ...req.body },
    schema,
    { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        column: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { column: result.value },
            { $set: {
              columnLabel: result.label,
              columnLabelLength: result.label.length
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

const putColumnsImage = (req, res) => {
  const schema = {
    value: Joi.number()
      .integer()
      .min(1)
      .required()
      .description('column value'),

    columnPicture: Joi.object()
      .required()
      .description('column picture')
  }

  return Joi.validate(
    { ...req.params, columnPicture: req.file },
    schema,
    { abortEarly: false, allowUnknown: true }
  )
    .then(async result => {
      QuestionsEditor.findOne({
        column: result.value, enabled: true, deleted: false
      })
        .then(item => {
          if (!item) return item

          if (!item.enabled && item.deleted) return item

          return QuestionsEditor.updateMany(
            { column: result.value },
            { $set: { columnImage: req.file.path } }
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
  createColumns,
  deleteColumns,
  putColumnsLabel,
  putColumnsImage
}
