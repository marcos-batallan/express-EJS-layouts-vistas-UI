// Se importa este framework para crear el servidor web, definir los endpoints, manejar requests y responses, usar middlewares
import express from 'express';

// Se importa el modulo path para el manejo de rutas de archivos
import path from 'path';

// Se importa este middleware para simular métodos HTTP que el navegador no puede enviar desde formularios HTML.
import methodOverride from 'method-override';

// Se importa el middleware para la implementación de layouts en EJS
import expressLayouts from 'express-ejs-layouts';

// Se importa este módulo para convertir URL a ruta
import { fileURLToPath } from 'url';

// Se importa la conexión a la DB
import { connectDB } from './config/dbConfig.mjs';

// Se importan los endpoints relacionados a los superhéroes
import SuperHeroRoutes from './routes/SuperHeroRoutes.mjs';

// Se importa el controlador para la vista EJS
import {
    obtenerSuperheroesDashboardController,
    obtenerSuperheroeParaEditarController
} from './controllers/superheroesController.mjs';

// Aquí se crea el servidor listo para configurarse
const app = express();

// Aquí se simula __dirname en ES Modules (.mjs)
const __filename = fileURLToPath(import.meta.url); // Convierte URL a la ruta real
const __dirname = path.dirname(__filename); // Obtine la ruta de la carpeta

// Aquí se define en qué puerto corre el servidor
const PORT = process.env.PORT || 3000;


// Aquí se configura el motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para convertir las requests a JSON
app.use(express.json());

 // Middleware para que Express pueda leer req.body desde formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para el uso de layouts en EJS
app.use(expressLayouts);
app.set("layout", "layout") //usa views/layout.ejs

// Servir archivos estáticos
app.use(express.static(path.resolve('./public')));

// Middleware para simular métodos HTTP que el navegador no puede enviar desde formularios HTML.
app.use(methodOverride("_method"))

// Configuración de rutas (todas las rutas bajo el prefijo /api)
app.use('/api', SuperHeroRoutes);

// Configuración de ruta para Check de configuración de EJS
app.get("/test", (req, res) => {
    res.render("dashboardTest");
});

// Configuración de ruta para la Landing Page EJS
app.get("/", (req,res) => {
    res.render("landingPage");
});

// Configuración de ruta para el dashboad EJS
app.get("/heroes", obtenerSuperheroesDashboardController);

// Configuración de ruta para editar Superhéroe EJS
app.get("/heroes/editar/:id", obtenerSuperheroeParaEditarController);;

// Configuración de ruta para agregar Superhéroe EJS
app.get("/heroes/agregar", (req, res) => {
    res.render("addSuperhero", {
        errores: [],
        datos: {}
    });
});

// Manejo de errores para rutas no encontradas
app.use ((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Conexión a MongoDB + Levantar el servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error conectando a la DB:", error);
    });


/*****
Este archivo es el punto de entrada. Configura el servidor Express, middlewares, conexión a base de datos y registra las rutas de la API.
*****/