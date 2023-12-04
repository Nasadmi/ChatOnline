import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'MultiApp'
  })
})

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'MultiApp'
  })
})

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'MultiApp'
  })
})

export { router as indexRoutes }
