'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionEditorSchema = new Schema({
  row: Number,
  rowLabel: {
    type: String,
    default: null
  },
  rowLabelLength: {
    type: Number,
    default: null
  },
  rowImage: {
    type: String,
    data: Buffer,
    contentType: String
  },
  column: Number,
  columnLabel: {
    type: String,
    default: null
  },
  columnLabelLength: {
    type: Number,
    default: null
  },
  columnImage: {
    type: String,
    data: Buffer,
    contentType: String
  },
  enabled: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date().getTime()
  }
})

const QuestionsEditor = mongoose
  .model('questions_editor', questionEditorSchema)

module.exports = {
  QuestionsEditor
}
