const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Definir el esquema de medición
const medicionSchema = new mongoose.Schema({
  nivel_oxigeno: { 
    type: Number, 
    required: true 
  },
  pulso_cardiaco: { 
    type: Number, 
    required: true 
  },
  fecha_hora: { 
    type: Date, 
    required: true 
  },
  usuario_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true 
  }
});

// Crear el modelo de Medición
const Medicion = mongoose.model('Medicion', medicionSchema);

// Obtener todas las mediciones
router.get('/mediciones', async (req, res) => {
  try {
    const mediciones = await Medicion.find();
    res.json(mediciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una medición por ID
router.get('/mediciones/:id', async (req, res) => {
  try {
    const medicion = await Medicion.findById(req.params.id);
    if (!medicion) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    res.json(medicion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener mediciones por ID de usuario
router.get('/mediciones/usuario/:usuario_id', async (req, res) => {
  try {
    const mediciones = await Medicion.find({ usuario_id: req.params.usuario_id });
    if (!mediciones.length) {
      return res.status(404).json({ message: "No measurements found for this user" });
    }
    res.json(mediciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva medición
router.post('/mediciones', async (req, res) => {
  try {
    const medicion = new Medicion({
      nivel_oxigeno: req.body.nivel_oxigeno,
      pulso_cardiaco: req.body.pulso_cardiaco,
      fecha_hora: req.body.fecha_hora,
      usuario_id: req.body.usuario_id
    });
    
    const nuevaMedicion = await medicion.save();
    res.status(201).json(nuevaMedicion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una medición
router.put('/mediciones/:id', async (req, res) => {
  try {
    const medicion = await Medicion.findByIdAndUpdate(
      req.params.id,
      {
        nivel_oxigeno: req.body.nivel_oxigeno,
        pulso_cardiaco: req.body.pulso_cardiaco,
        fecha_hora: req.body.fecha_hora
      },
      { new: true }
    );
    
    if (!medicion) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    
    res.json(medicion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una medición
router.delete('/mediciones/:id', async (req, res) => {
  try {
    const medicion = await Medicion.findByIdAndDelete(req.params.id);
    if (!medicion) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    res.json({ message: "Measurement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;