// Importar el módulo Express para crear rutas y manejar solicitudes.
const express = require('express');
// Importar mongoose para interactuar con MongoDB.
const mongoose = require('mongoose');
// Crear un enrutador de Express para definir las rutas de usuario.
const router = express.Router();

// Definir el esquema del usuario utilizando mongoose.
const userSchema = new mongoose.Schema({
  // Campo `name` es de tipo String y es obligatorio.
  name: { type: String, required: true },
  // Campo `phoneNumber` es de tipo String y es obligatorio.
  phoneNumber: { type: String, required: true }
});

// Crear el modelo `User` basado en el esquema definido.
const User = mongoose.model('User', userSchema);

// Ruta POST: Crear un nuevo usuario.
router.post('/', async (req, res) => {
  try {
    // Crear un usuario basado en los datos enviados en el cuerpo de la solicitud.
    const user = new User(req.body);
    // Guardar el usuario en la base de datos.
    await user.save();
    // Enviar una respuesta con el usuario creado y un código 201 (creado).
    res.status(201).json(user);
  } catch (error) {
    // Si ocurre un error, enviar un código 400 con el mensaje de error.
    res.status(400).json({ message: error.message });
  }
});

// Ruta GET: Obtener todos los usuarios.
router.get('/', async (req, res) => {
  try {
    // Buscar todos los documentos en la colección `User`.
    const users = await User.find();
    // Enviar los usuarios encontrados en formato JSON.
    res.json(users);
  } catch (error) {
    // Si ocurre un error, enviar un código 500 con el mensaje de error.
    res.status(500).json({ message: error.message });
  }
});

// Ruta PUT: Actualizar un usuario por su ID.
router.put('/:id', async (req, res) => {
  try {
    // Actualizar un usuario utilizando su ID y los datos enviados.
    // La opción `{ new: true }` devuelve el usuario actualizado.
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Enviar el usuario actualizado en la respuesta.
    res.json(user);
  } catch (error) {
    // Si ocurre un error, enviar un código 400 con el mensaje de error.
    res.status(400).json({ message: error.message });
  }
});

// Ruta DELETE: Eliminar un usuario por su ID.
router.delete('/:id', async (req, res) => {
  try {
    // Buscar y eliminar un usuario utilizando su ID.
    await User.findByIdAndDelete(req.params.id);
    // Enviar un mensaje confirmando la eliminación del usuario.
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    // Si ocurre un error, enviar un código 500 con el mensaje de error.
    res.status(500).json({ message: error.message });
  }
});

// Exportar el enrutador para ser usado en otros archivos.
module.exports = router;
