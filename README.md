# IUD Movies Backend - API RESTful

API RESTful desarrollada en Node.js y Express aplicando la arquitectura **MVC (Modelo-Vista-Controlador)** con **MongoDB Atlas** para la gestión de un catálogo de películas y series.

---

## 🚀 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para el desarrollo de la API REST.
- **MongoDB Atlas**: Base de datos NoSQL alojada en la nube.
- **Mongoose**: ODM para la modelación y validación de datos.
- **Nodemon**: Herramienta de recarga automática en entorno de desarrollo.
- **dotenv**: Gestión de variables de entorno seguras.

---

## 📁 Estructura del Proyecto (MVC)

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Conexión a MongoDB Atlas
│   ├── controllers/              # Controladores con lógica de negocio
│   ├── models/                   # Esquemas de Mongoose
│   ├── routes/                   # Endpoints de la API
│   └── app.js                    # Configuración e instancia de Express
├── .env                          # Variables de entorno (privado)
├── .gitignore                    # Archivos ignorados por Git
├── index.js                      # Punto de entrada de la aplicación
├── package.json                  # Scripts y dependencias
└── seed.js                       # Script de carga masiva de datos (100 películas)

Configuración e Instalación
1. Clonar el repositorio
git clone [https://github.com/jaraiudigital/iud-movies-backend-mongodb.git](https://github.com/jaraiudigital/iud-movies-backend-mongodb.git)
cd backend

2. Instalar dependencias

npm install

3. Configurar variables de entorno
Crea un archivo .env en la raíz del directorio backend/ con las credenciales de mongo DB Atlas

4. Poblar la base de datos (Seed)
Para limpiar la base de datos y cargar 100 películas iniciales con sus géneros, directores y productoras:

npm run seed

5.Iniciar el servidor

# Modo desarrollo (con Nodemon)
npm run dev

# Modo producción
npm start