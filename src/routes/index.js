import { Router } from 'express'
import empleadoRoutes from './empleadoRoutes.js'
import authRoutes from './authRoutes.js'

const router = Router()

// en app necesito una ruta base
router.use('/empleados', empleadoRoutes)
router.use('/auth', authRoutes)

export default router
