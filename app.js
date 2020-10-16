'use strict'

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// custom modules
import Person from './Schema.js'
import configApp from './app.config.js'
import registerRoute from './routes/registerRoute.js'
import indexRoute from './routes/indexRoute.js'

const app = express()
dotenv.config() // dotenv

configApp(app)

/*==================================================== 
    ENV VARIABLES
=====================================================*/
const { MONGO_URI, PORT } = process.env

/*==================================================== 
    CONNECT TO DB
=====================================================*/
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// ROUTES
indexRoute(app)
registerRoute(app, Person)

app.listen(PORT || 8080, () => console.log(`Server runnin on ${PORT}`))
