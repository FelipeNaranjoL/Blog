import express from 'express' 
// Importamos las funciones del controlador de administración que manejan login, comentarios, blogs y dashboard
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js'; // Middleware para proteger rutas y verificar token JWT

// Creamos un router específico para rutas de administración
const adminRouter = express.Router();

// 📌 Ruta POST /login
// Permite al administrador iniciar sesión
// Recibe email y pass en el body
// Devuelve un token JWT si las credenciales son correctas
adminRouter.post("/login", adminLogin);

// 📌 Ruta GET /comments
// Devuelve todos los comentarios
// Protegida con auth: solo administradores autenticados pueden acceder
adminRouter.get("/comments", auth, getAllComments);

// 📌 Ruta GET /blogs
// Devuelve todos los blogs para administración
// Protegida con auth
adminRouter.get("/blogs", auth, getAllBlogsAdmin);

// 📌 Ruta POST /delete-comment
// Permite eliminar un comentario por su ID
// Protegida con auth
adminRouter.post("/delete-comment", auth, deleteCommentById);

// 📌 Ruta POST /approve-comment
// Permite aprobar un comentario por su ID (cambiar isApproved a true)
// Protegida con auth
adminRouter.post("/approve-comment", auth, approveCommentById);

// 📌 Ruta GET /dashboard
// Devuelve información resumida para el dashboard del administrador
// Incluye cantidad de blogs, comentarios, borradores y últimos blogs
// Protegida con auth
adminRouter.get("/dashboard", auth, getDashboard);

// Exportamos el router para usarlo en app.js o servidor principal
export default adminRouter;
