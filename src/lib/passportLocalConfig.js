import passport from 'passport'

import { Strategy } from 'passport-local'

import { db } from './db.js'

import { compare } from 'bcrypt'

const pass = passport

pass.use(new Strategy((email, password, done) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err !== null) {
      done(true, false, {
        message: `${err.message}`
      })
      throw err
    }

    if (result.length <= 0) {
      return done(null, true, {
        message: 'User doesnt exists'
      })
    }

    if (!(await compare(password, result[0].password))) {
      return done(null, true, {
        message: 'Incorrect password'
      })
    }

    done(null, result[0].id)
  })
}))

pass.serializeUser((user, done) => {
  done(null, user)
})

pass.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], async (result, err) => {
    if (err !== null) {
      done(null, false)
      throw err
    }

    if (result[0] === undefined) {
      return done(null, false, {
        message: 'User doesnt exist'
      })
    }

    const user = result[0]

    done(null, user)
  })
})

export { pass }
