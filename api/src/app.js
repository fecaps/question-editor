'use strict'

const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { connect } = require('./redis')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const { PORT, MONGO_URL, MONGO_DATABASE } = require('./definitions')

mongoose.connect(`${MONGO_URL}/${MONGO_DATABASE}`)

const mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'))
mongoDB.once('open', () => console.log('Mongo DB connected'))

connect()

const routes = require('./routes')
app.use('/', routes)

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
