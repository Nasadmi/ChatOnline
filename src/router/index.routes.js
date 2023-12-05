import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'MultiApp',
    theme: req.cookies.theme
  })
})

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'MultiApp',
    theme: req.cookies.theme
  })
})

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'MultiApp',
    theme: req.cookies.theme
  })
})

export { router as indexRoutes }
