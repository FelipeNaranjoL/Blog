import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js'; 

// Controlador de login de administrador
export const adminLogin = async (req, res) => {
    try {
        // Extraemos credenciales del body
        const { email, password } = req.body;

        // Verificación simple contra variables de entorno
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
            return res.json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }

        // Generamos el token JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        // Respuesta exitosa con el token
        res.json({ success: true, token });
    } catch (error) {
        // Si ocurre un error inesperado, lo devolvemos
        res.json({ success: false, message: error.message });
    }
};
// Controlador para obtener todos los blogs (modo administrador)
export const getAllBlogsAdmin = async (req, res) => {
    try {
        // Buscamos todos los blogs sin filtrar por "isPublished"
        // Esto permite al administrador ver tanto publicados como no publicados.
        // Luego los ordenamos por fecha de creación en orden descendente (más recientes primero).
        const blogs = await Blog.find({}).sort({ CreateAt: -1 })
        // Respondemos al cliente con la lista de blogs
        res.json({ success: true, blogs });
    } catch (error) {
        // Si ocurre un error, devolvemos el mensaje
        res.json({ success: false, message: error.message });
    }
}

// Controlador para obtener todos los comentarios
export const getAllComments = async (req, res) => {
    try {
        // Obtenemos todos los comentarios desde la colección "comments"
        // .populate("blog") sustituye el campo "blog" (ObjectId)
        // por el documento completo del blog relacionado
        // .sort({ createdAt: -1 }) ordena los resultados por fecha de creación descendente
        const comments = await Comment.find({}).populate("blog").sort({ CreateAt: -1 })
        // Respondemos al cliente con la lista de comentarios
        res.json({ success: true, comments });
    } catch (error) {
        // Si ocurre un error, devolvemos el mensaje
        res.json({ success: false, message: error.message });
    }
}

//  Controlador para obtener datos del Dashboard
export const getDashboard = async (req, res) => {
    try {
        // Obtenemos los 5 blogs más recientes, ordenados por fecha de creación
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        // Contamos la cantidad total de blogs
        const blogs = await Blog.countDocuments();
        // Contamos la cantidad total de comentarios
        const comments = await Comment.countDocuments();
        // Contamos la cantidad de borradores (blogs no publicados)
        const drafts = await Blog.countDocuments({ isPublished: false });
        // Estructuramos todos los datos del dashboard en un objeto
        const dashboardData = {
            blogs,      // total de blogs
            comments,   // total de comentarios
            drafts,     // total de blogs no publicados
            recentBlogs // últimos 5 blogs creados
        };
        // Respondemos con éxito y los datos del dashboard
        res.json({ success: true, dashboardData });
    } catch (error) {
        // Si ocurre un error, devolvemos el mensaje
        res.json({ success: false, message: error.message });
    }
};

//  Controlador para eliminar un comentario por su ID
export const deleteCommentById = async (req, res) => {
    try {
        // Extraemos el id del comentario desde el cuerpo de la petición
        const { id } = req.body;

        // Usamos Mongoose para eliminar el comentario con ese id
        await Comment.findByIdAndDelete(id);

        // Si se elimina correctamente, respondemos con éxito
        res.json({ success: true, message: 'comentario eliminado' });
    } catch (error) {
        // Si ocurre un error, lo devolvemos en la respuesta
        res.json({ success: false, message: error.message });
    }
};


//  Controlador para aprobar un comentario por su ID
export const approveCommentById = async (req, res) => {
    try {
        // Extraemos el id del comentario desde el cuerpo de la petición
        const { id } = req.body;

        // Usamos Mongoose para actualizar el campo "isApproved" del comentario a true
        await Comment.findByIdAndUpdate(id, { isApproved: true });

        // Si se actualiza correctamente, respondemos con éxito
        res.json({ success: true, message: 'comentario aprobado' });
    } catch (error) {
        // Si ocurre un error, lo devolvemos en la respuesta
        res.json({ success: false, message: error.message });
    }
};
