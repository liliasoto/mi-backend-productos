const express = require('express');
const router = express.Router();
const Visita = require('../models/visita');

// Obtener todas las visitas
router.get('/', async (req, res) => {
  try {
    const visitas = await Visita.find().populate('clienteId');
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva visita
router.post('/', async (req, res) => {
  const visita = new Visita({
    clienteId: req.body.clienteId,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha
  });

  try {
    const nuevaVisita = await visita.save();
    res.status(201).json(nuevaVisita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener visitas por cliente
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const visitas = await Visita.find({ clienteId: req.params.clienteId }).populate('clienteId');
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una visita específica
router.get('/:id', async (req, res) => {
  try {
    const visita = await Visita.findById(req.params.id).populate('clienteId');
    if (visita == null) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }
    res.json(visita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una visita
router.patch('/:id', async (req, res) => {
  try {
    const visita = await Visita.findById(req.params.id);
    if (visita == null) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }
    
    if (req.body.clienteId != null) {
      visita.clienteId = req.body.clienteId;
    }
    if (req.body.descripcion != null) {
      visita.descripcion = req.body.descripcion;
    }
    if (req.body.fecha != null) {
      visita.fecha = req.body.fecha;
    }

    const visitaActualizada = await visita.save();
    res.json(visitaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una visita
router.delete('/:id', async (req, res) => {
  try {
    const visita = await Visita.findById(req.params.id);
    if (visita == null) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }
    await visita.remove();
    res.json({ message: 'Visita eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;