const cors = require('cors')
const morgan = require('morgan')
const express = require('express')

const apiRoutes = require('./api.routes')

const app = express()

app
    .use(cors())
    .use(morgan('dev'))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use('/api', apiRoutes)
    .get('/', (_, res) => res.send('<h1>Welcome to ms-restaurant API 👋 </h1>'))

module.exports = app