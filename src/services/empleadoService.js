import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import EmpleadoRepository from '../repositories/EmpleadoRepository.js'
import EmpleadoModel from '../models/EmpleadoModel.js'
import { sendPasswordResetEmail } from '../utils/emailService.js'

const empleadoRepository = new EmpleadoRepository()
const secret = process.env.JWT_SECRET
const saltRound = 10

class EmpleadoService {
  async createEmpleado (data, file) {
    const existEmpleado = await empleadoRepository.getEmpleadoByUsername(data.username)
    if (existEmpleado) {
      throw new Error('El username ya existe')
    }
    const hashedPass = await bcrypt.hash(data.password, saltRound)

    const newEmpleado = new EmpleadoModel(
      null,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.username,
      hashedPass,
      data.rol,
      null
    )
    const empleadoId = await empleadoRepository.createEmpleado(newEmpleado)

    if (file) {
      const image = `${empleadoId}_image.png`
      const imagePath = path.join('src', 'userImages', image)
      fs.writeFileSync(imagePath, file.buffer)
      await empleadoRepository.updateEmpleado(empleadoId, {image: image })
    }
    return empleadoId
  }
}