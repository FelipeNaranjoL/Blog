import express from "express"; 
// Importa Express, un framework para Node.js que permite crear servidores
// y manejar rutas HTTP de manera sencilla.

import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } 
    from "../controllers/blogController.js"; 
// Importa las funciones controladoras que contienen la lógica de negocio
// para gestionar los blogs (crear, obtener, eliminar, cambiar estado, etc.).

import upload from "../middleware/multer.js"; 
// Importa el middleware Multer, que se usa para manejar la subida de archivos (ej: imágenes).

import auth from "../middleware/auth.js"; 
// Importa el middleware de autenticación, que protege las rutas 
// para que solo usuarios autorizados puedan ejecutarlas.

const blogRouter = express.Router(); 
// Crea una nueva instancia de Router de Express.
// Permite definir rutas relacionadas con los blogs de forma modular.

// Ruta para añadir un nuevo blog.
// - Primero se aplica 'upload.single("image")' para procesar la imagen enviada.
// - Luego 'auth' valida que el usuario esté autenticado.
// - Finalmente 'addBlog' guarda el blog en la base de datos.
blogRouter.post("/add", upload.single('image'), auth, addBlog);

// Ruta para obtener todos los blogs.
// No requiere autenticación, por lo que cualquiera puede listar blogs.
blogRouter.get("/all", getAllBlogs);

// Ruta para obtener un blog específico mediante su ID.
// Se usa un parámetro dinámico en la URL (":blogId").
blogRouter.get("/:blogId", getBlogById);

// Ruta para eliminar un blog.
// Requiere autenticación, para que solo usuarios autorizados puedan eliminar.
blogRouter.post("/delete", auth, deleteBlogById);

// Ruta para cambiar el estado de publicación de un blog (ej: publicar/despublicar).
// También requiere autenticación.
blogRouter.post("/toggle-publish", auth, togglePublish);

// Ruta para añadir comentario
blogRouter.post("/add-comment", addComment);
// Ruta para ver los comentarios en base un id de blog
blogRouter.post("/comments", getBlogComments);

export default blogRouter; 
// Exporta el router para que pueda usarse en 'app.js' u otros módulos.
