import express from 'express'
// Importamos la función del controlador que maneja el login del admin
import { adminLogin } from '../controllers/adminController.js';

// Creamos un router específico para rutas de administración
const adminRouter = express.Router();

// Definimos la ruta POST /login que ejecuta adminLogin
// Esta ruta recibirá email y pass en el body
adminRouter.post("/login", adminLogin);

// Exportamos el router para usarlo en app.js o server principal
export default adminRouter;
