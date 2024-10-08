import { db } from '../config/firebase.js'
import empleadoModel from '../models/EmpleadoModel.js'

class EmpleadoRepository {
  async createEmpleado(data) {
    const empleado = await db.collection('empleados').add({
      nombre: data.nombre,
      apaterno: data.apaterno,
      amaterno: data.amaterno,
      direccion: data.direccion,
      telefono: data.telefono,
      ciudad: data.ciudad,
      estado: data.estado,
      usuario: data.usuario,
      password: data.password,
      rol: data.rol,
      imagen: data.imagen
    })

    return empleado.id
  }

  async updateEmpleado(id, data) {
    await db.collection('empleados').doc(id).update(data)
  }

  async deleteEmpleado(id) {
    await db.collection('empleados').doc(id).delete()
  }

  async getAllEmpleados() {
    const docs = await db.collection('empleados').get()
    const empleados = []
    docs.forEach((doc) => {
      const data = doc.data()
      empleados.push(new empleadoModel(
        doc.id,
        data.nombre,
        data.apaterno,
        data.amaterno,
        data.direccion,
        data.telefono,
        data.ciudad,
        data.estado,
        data.usuario,
        data.password,
        data.rol,
        data.imagen
      ))
    })
    return empleados
  }

  async getEmpleadoById(id) {
    const doc = await db.collection('empleados').doc(id).get()

    if(!doc.exists) {
      return null
    }

    const data = doc.data()
    return new empleadoModel(
      doc.id,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.usuario,
      data.password,
      data.rol,
      data.imagen
    )
  }

  async getEmpleadoByUsername(usuario) {
    const empleado = await db.collection('empleados').where('usuario', '==', usuario).get()

    if(empleado.empty) {
      return null
    }

    const doc = empleado.docs[0]
    const data = doc.data()
    return new empleadoModel(
      doc.id,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.usuario,
      data.password,
      data.rol,
      data.imagen
    )
  }

  async getEmpleadoByRol(rol) {
    const docs = await db.collection('empleados').where('rol', '==', rol).get()
    const empleados = []
    docs.forEach((doc) => {
      const data = doc.data()
      empleados.push(new empleadoModel(
        doc.id,
        data.nombre,
        data.apaterno,
        data.amaterno,
        data.direccion,
        data.telefono,
        data.ciudad,
        data.estado,
        data.usuario,
        data.password,
        data.rol,
        data.imagen
      ))
    })
    return empleados
  }
}

export default EmpleadoRepository
