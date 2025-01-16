const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const visitasEsquema = new mongoose.Schema({
    ferreteriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendedores', required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true }
});

const Visitas = mongoose.model('Visitas', visitasEsquema);

router.post('/', async (req, res) => {
    try {
        const nuevaVisita = new Visitas(req.body);
        await nuevaVisita.save();
        res.status(201).json(nuevaVisita);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const visitas = await Visitas.find().populate('ferreteriaId');
        res.json(visitas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:ferreteriaId', async (req, res) => {
    try {
        const visitas = await Visitas.find({ ferreteriaId: req.params.ferreteriaId }).populate('ferreteriaId');
        res.json(visitas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;