import express from 'express'

import { config } from 'dotenv'

import { app } from '../lib/app.js'

import { server } from '../lib/http.js'

import logger from 'morgan'

import { pass } from '../lib/passportLocalConfig.js'

import cors from 'cors'

import cookieParser from 'cookie-parser'

import session from 'express-session'

import fileUpload from 'express-fileupload'

import { db } from '../lib/db.js'

if (process.env.NODE_ENV === 'prod') {
  config({
    path: '../../.env.prod'
  })
} else {
  config()
  app.use(logger('dev'))
}

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  }
}))

app.use(cors())

app.use(cookieParser())

app.use(fileUpload({
  limits: {
    fileSize: Math.pow(10, 7)
  }
}))

app.use(pass.initialize())

app.use(pass.session())

app.set('view engine', 'ejs')

app.set('views', process.cwd + '/views')

app.use('/resources', express.static(process.cwd + '/public'))

server.listen(parseInt(process.env.PORT), () => {
  console.log('Server is listening on port', process.env.PORT)
})

db.connect(err => {
  if (err !== null) {
    throw err
  } else {
    console.log('Connected to database')
  }
})
