const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => {
  console.error('Error de conexión a MongoDB:', err);
  process.exit(1);
});

// Importar rutas
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const medicionRoutes = require('./medicionRoutes');
const alarmasRoutes = require('./alarmasRoutes');

const clientesRoutes = require('./routes/clientesRoutes');
const visitasRoutes = require('./routes/visitasRoutes');

// Usar rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/', usuariosRoutes);
app.use('/', medicionRoutes);
app.use('/alarmas', alarmasRoutes);

app.use('/api/clientes', clientesRoutes);
app.use('/api/visitas', visitasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});