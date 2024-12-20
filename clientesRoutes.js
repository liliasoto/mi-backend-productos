const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const vendedoresEsquema = new mongoose.Schema({
    numero_cliente: { type: String, required: true },
    nom_ferre: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    nom_encargado: { type: String, required: true },
    telefono: { type: String, required: true },
    imagen: { type: String, required: true },
    cliente_nuestro: { type: Boolean, required: true },
    ubicacion: {type: String, required: true }
});

const Vendedores = mongoose.model('Vendedores', vendedoresEsquema);

router.post('/', async (req, res) => {
    try {
        const vendedorpost = new Vendedores(req.body);
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendedorpost = await Vendedores.find();
        res.json(vendedorpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vendedorpost = await Vendedores.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Vendedores.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;