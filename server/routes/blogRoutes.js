import express from "express" // Importa Express para crear rutas
import { addBlog } from "../controllers/blogController.js" // Importa la función controladora para añadir un blog
import upload from "../middleware/multer.js"; // Middleware para manejar la subida de archivos (imagenes)
import auth from "../middleware/auth.js"; // Middleware de autenticación para proteger la ruta

const blogRouter = express.Router(); // Crea un router de Express

// Ruta POST para añadir un blog
// Se aplica primero 'upload.single("image")' para procesar la imagen,
// luego 'auth' para verificar que el usuario esté autenticado
// finalmente se llama a 'addBlog' para crear el blog en la base de datos
blogRouter.post("/add", upload.single('image'), auth, addBlog)

export default blogRouter; // Exporta el router para usarlo en app.js
