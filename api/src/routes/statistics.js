'use strict'

const express = require('express')
const router = express.Router()
const { selectStatistics } = require('../controllers')

router.get('/', (req, res) => selectStatistics(req, res))

module.exports = router
