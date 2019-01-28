'use strict'

const express = require('express')
const router = express.Router()
const { list } = require('../controllers')

router.get('/', (req, res) => list(req, res))

router.use('/rows', require('./rows'))

router.use('/columns', require('./columns'))

router.use('/statistics', require('./statistics'))

module.exports = router
