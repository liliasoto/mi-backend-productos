const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Esquema de Alarma
const alarmaSchema = new mongoose.Schema({
    usuario_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    days: { 
        type: [String], 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    enabled: { 
        type: Boolean, 
        default: true 
    }
});

const Alarma = mongoose.model('Alarma', alarmaSchema);

// Obtener todas las alarmas de un usuario
router.get('/usuario/:usuario_id', async (req, res) => {
    try {
        const alarmas = await Alarma.find({ usuario_id: req.params.usuario_id });
        res.json(alarmas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva alarma
router.post('/', async (req, res) => {
    try {
        const alarma = new Alarma(req.body);
        await alarma.save();
        res.status(201).json(alarma);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una alarma
router.put('/:id', async (req, res) => {
    try {
        const alarma = await Alarma.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alarma) {
            return res.status(404).json({ message: "Alarma no encontrada" });
        }
        res.json(alarma);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una alarma
router.delete('/:id', async (req, res) => {
    try {
        const alarma = await Alarma.findByIdAndDelete(req.params.id);
        if (!alarma) {
            return res.status(404).json({ message: "Alarma no encontrada" });
        }
        res.json({ message: "Alarma eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
