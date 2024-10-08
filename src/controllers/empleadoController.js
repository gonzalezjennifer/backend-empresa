import EmpleadoService from '../services/empleadoService.js'
import { validationResult } from 'express-validator'

const empleadoService = new EmpleadoService()

const handValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array()
    })
  }
  next()
}

const createEmpleado = async (req, res) => {
  handValidationErrors(req)
  try {
    const empleadoId = await empleadoService.createEmpleado(req.body, req.file)
    res.status(201).json({
      success: true,
      empleadoId
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const updateEmpleado = async (req, res) => {
  //handValidationErrors(req)
  try {
    const id = req.params.id
    await empleadoService.updateEmpleado(id, req.body, req.file)
    res.status(201).json({
      success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const deleteEmpleado = async (req, res) => {
  //handValidationErrors(req)
  try {
    const id = req.params.id
    await empleadoService.deleteEmpleado(id)
    res.status(201).json({
      success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAllEmpleados()
    res.status(201).json({
      success: true,
      empleados
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoById = async (req, res) => {
  //handValidationErrors(req)
  try {
    const id = req.params.id
    const empleado = await empleadoService.getEmpleadoById(id)
    if (!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not found'
      })
    }
    res.status(201).json({
      success: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoByUsername = async (req, res) => {
  //handValidationErrors(req)
  try {
    const username = req.params.username
    const empleado = await empleadoService.getEmpleadoByUsername(username)
    if (!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not found'
      })
    }
    res.status(201).json({
      success: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getEmpleadoByRol = async (req, res) => {
  //handValidationErrors(req)
  try {
    const rol = req.params.rol
    const empleado = await empleadoService.getEmpleadoByRol(rol)
    if (!empleado) {
      res.status(404).json({
        success: false,
        message: 'Empleado not found'
      })
    }
    res.status(201).json({
      success: true,
      empleado
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  getEmpleadoByRol,
  getEmpleadoByUsername
}