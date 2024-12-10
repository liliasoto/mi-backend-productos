# VitalCheck API Backend

API RESTful desarrollada con Node.js, Express y MongoDB para la aplicación VitalCheck de monitoreo de signos vitales.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Cors
- Dotenv

## Estructura del Proyecto

```
backend/
├── server.js               # Punto de entrada de la aplicación
├── usuariosRoutes.js       # Rutas para gestión de usuarios
├── medicionesRoutes.js     # Rutas para gestión de mediciones
├── alarmasRoutes.js        # Rutas para gestión de alarmas
└── .env                # Variables de entorno
```

## Requisitos previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/liliasoto/mi-backend-productos
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear archivo .env con:
```
MONGODB_URI=mongodb+srv://0liliasoto0:password@cluster0.flvip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

4. Iniciar el servidor:
```bash
npm start
```

## Endpoints de la API

### Usuarios

- POST /api/usuarios/registro
  - Registro de nuevo usuario
  - Body: { nombre, email, password }

- POST /api/usuarios/login
  - Inicio de sesión
  - Body: { email, password }

- GET /api/usuarios/perfil
  - Obtener perfil del usuario
  - Requiere token JWT

- PUT /api/usuarios/perfil
  - Actualizar perfil
  - Requiere token JWT
  - Body: { nombre, email, ... }

### Mediciones

- POST /api/mediciones
  - Crear nueva medición
  - Requiere token JWT
  - Body: { oxigenacion, pulso, fecha }

- GET /api/mediciones
  - Obtener mediciones del usuario
  - Requiere token JWT
  - Query params: { fecha_inicio, fecha_fin }

- GET /api/mediciones/:id
  - Obtener medición específica
  - Requiere token JWT

- DELETE /api/mediciones/:id
  - Eliminar medición
  - Requiere token JWT

### Alarmas

- POST /api/alarmas
  - Crear nueva alarma
  - Requiere token JWT
  - Body: { hora, días, nombre, habilitada }

- GET /api/alarmas
  - Obtener alarmas del usuario
  - Requiere token JWT
  - Query params: { fecha_inicio, fecha_fin }

- GET /api/alarmas/:id
  - Obtener alarma específica
  - Requiere token JWT

- DELETE /api/alarmas/:id
  - Eliminar alarma
  - Requiere token JWT

## Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a rutas protegidas:

1. Obtener token mediante login
2. Incluir token en header:
```
Authorization: Bearer <token>
```

## Modelos de datos

### Usuario
```javascript
{
  nombre: String,
  email: String,
  password: String,
  fecha_registro: Date
}
```

### Medición
```javascript
{
  usuario_id: ObjectId,
  oxigenacion: Number,
  pulso: Number,
  fecha: Date
}
```

### Alarma
```javascript
{
  usuario_id: ObjectId,
  time: String, 
  days: String, 
  name: String, 
  enabled: Boolean, 
}
```

## Despliegue

### Preparación para producción

1. Configurar variables de entorno de producción
2. Asegurar conexión MongoDB
3. Configurar CORS según dominio de producción
4. Implementar logging adecuado

### Recomendaciones de hosting

- Render
- Heroku
- DigitalOcean
- AWS EC2
- MongoDB Atlas (para la base de datos)

## Scripts disponibles

- `npm start`: Inicia el servidor
- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm test`: Ejecuta tests
- `npm run migrate`: Ejecuta migraciones de base de datos

## Seguridad

- Passwords hasheados con bcrypt
- Protección contra XSS
- Rate limiting implementado
- Validación de datos con express-validator
- Sanitización de entradas

## Mantenimiento

- Monitoreo con PM2
- Logs con Winston
- Backup automático de base de datos
- Healthchecks implementados

## Contribución

1. Fork el repositorio
2. Crear rama (`git checkout -b feature/nombreFeature`)
3. Commit (`git commit -am 'Add nombreFeature'`)
4. Push (`git push origin feature/nombreFeature`)
5. Crear Pull Request

## Soporte

Para soporte, contactar a [0.lilia.soto.0@gmail.com](0.lilia.soto.0@gmail.com)