'use strict'

const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'assets/uploads/' })

const router = express.Router()
const {
  createColumns,
  deleteColumns,
  putColumnsLabel,
  putColumnsImage
} = require('../controllers')

router.post('/', (req, res) => createColumns(req, res))

router.delete('/:value', (req, res) => deleteColumns(req, res))

router.put('/:value/labels', (req, res) => putColumnsLabel(req, res))

router.put('/:value/images', upload.single('columnPicture'), (req, res) =>
  putColumnsImage(req, res)
)

module.exports = router
