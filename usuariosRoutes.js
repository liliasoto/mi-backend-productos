const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  nombre_usuario: { 
    type: String, 
    required: true, 
    unique: true 
  },
  correo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contraseña: { 
    type: String, 
    required: true 
  },
  fecha_nacimiento: { 
    type: Date 
  },
  genero: { 
    type: String 
  },
  peso: { 
    type: Number 
  },
  fecha_creacion: { 
    type: Date, 
    default: Date.now 
  }
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario({
      nombre_usuario: req.body.nombre_usuario,
      correo: req.body.correo,
      contraseña: req.body.contraseña,
      fecha_nacimiento: req.body.fecha_nacimiento,
      genero: req.body.genero,
      peso: req.body.peso,
      fecha_creacion: req.body.fecha_creacion || new Date()
    });
    
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { peso: req.body.peso },
      { new: true }
    );
    
    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  if (!nombre_usuario || !contraseña) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  try {
    const usuario = await Usuario.findOne({ nombre_usuario: nombre_usuario });

    if (!usuario) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Inicio de sesión exitoso", usuario: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;