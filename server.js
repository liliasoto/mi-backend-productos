// Importar el módulo Express para crear el servidor.
const express = require('express');
// Importar mongoose para conectarse a MongoDB.
const mongoose = require('mongoose');
// Importar cors para permitir solicitudes desde otros orígenes.
const cors = require('cors');
// Importar dotenv para cargar variables de entorno desde un archivo `.env`.
require('dotenv').config();

// Crear una instancia de la aplicación Express.
const app = express();

// Middleware para habilitar CORS (Cross-Origin Resource Sharing).
app.use(cors());
// Middleware para analizar el cuerpo de las solicitudes en formato JSON.
app.use(express.json());

// Conexión a MongoDB utilizando las credenciales de las variables de entorno.
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,  // Usa el nuevo parser de URL de MongoDB.
  useUnifiedTopology: true // Usa el nuevo motor de administración de conexiones.
})
// Si la conexión es exitosa, mostrar un mensaje en la consola.
.then(() => console.log('Conectado a MongoDB'))
// Si ocurre un error en la conexión, mostrarlo y detener el proceso.
.catch(err => {
  console.error('Error de conexión a MongoDB:', err);
  process.exit(1); // Salir del proceso con un código de error.
});

// Importar las rutas de productos desde el archivo `productRoutes`.
const productRoutes = require('./productRoutes');
// Importar las rutas de usuarios desde el archivo `userRoutes`.
const userRoutes = require('./userRoutes');

const usuariosRoutes = require('./usuariosRoutes');
const medicionRoutes = require('./medicionRoutes');

// Usar las rutas de productos en el endpoint `/api/products`.
app.use('/api/products', productRoutes);
// Usar las rutas de usuarios en el endpoint `/api/users`.
app.use('/api/users', userRoutes);

app.use('/', usuariosRoutes);
app.use('/', medicionRoutes);

// Definir el puerto donde se ejecutará el servidor (por defecto 5000).
const PORT = process.env.PORT || 5000;
// Iniciar el servidor y escuchar en el puerto definido.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
