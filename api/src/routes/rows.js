'use strict'

const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'assets/uploads/' })

const router = express.Router()
const {
  createRows,
  deleteRows,
  putRowsLabel,
  putRowsImage
} = require('../controllers')

router.post('/', (req, res) => createRows(req, res))

router.delete('/:value', (req, res) => deleteRows(req, res))

router.put('/:value/labels', (req, res) => putRowsLabel(req, res))

router.put('/:value/images', upload.single('rowPicture'), (req, res) =>
  putRowsImage(req, res)
)

module.exports = router
