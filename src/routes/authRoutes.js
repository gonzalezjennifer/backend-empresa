import { Router } from 'express'
import { login, logout } from '../controllers/authController.js'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/login',
  [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty()
  ]
)

router.post('/logout', logout)

export default router
