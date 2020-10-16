import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import session from 'express-session'
import flash from 'connect-flash'
import compression from 'compression'

const configApp = (app) => {
    // setup template engine
    app.set('views', './views')
    app.set('view engine', 'pug')

    // setup session
    app.use(
        session({
            secret: 'secret',
            saveUninitialized: true,
            resave: true,
        })
    )

    // mount middlewares
    app.use('/public', express.static(process.cwd() + '/public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(helmet())
    app.use(flash())
    app.use(compression())
}

export default configApp
