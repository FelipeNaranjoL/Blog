import imagekit from "../configs/imageKit.js"; // Importa la configuración de ImageKit para subir y optimizar imágenes
import Blog from "../models/Blog.js"; // Importa el modelo de Blog de MongoDB
import Comment from "../models/Comment.js"; // Importa el modelo de Comment de MongoDB

// Controlador para añadir un nuevo blog
export const addBlog = async (req, res) => {
    try {
        // Extraemos los datos enviados desde el cliente, que vienen como string JSON en req.body.blog
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        // Obtenemos el archivo de imagen subido con multer desde req.file
        const imageFile = req.file;

        // Validación: si falta algún campo obligatorio, devolvemos un error
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Campos vacíos o mal insertados"
            });
        }

        // Subimos la imagen directamente a ImageKit usando el buffer del archivo
        const response = await imagekit.upload({
            file: imageFile.buffer, // El archivo en memoria
            fileName: imageFile.originalname, // Nombre original del archivo
            folder: "/blogs" // Carpeta en ImageKit donde se almacenará
        });

        // Generamos una URL optimizada de la imagen con transformaciones
        const optimizedImageUrl = imagekit.url({
            path: response.filePath, // Ruta del archivo subido
            transformation: [
                { quality: 'auto' }, // Calidad optimizada automáticamente
                { format: 'webp' },  // Conversión a formato WebP
                { width: "1280" }    // Ajuste de ancho a 1280px
            ]
        });

        // Creamos un nuevo documento Blog en la base de datos
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl, // Guardamos la URL optimizada
            isPublished
        });

        // Respuesta exitosa
        res.json({
            success: true,
            message: "Blog añadido"
        });

    } catch (error) {
        // Manejo de errores
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Controlador para obtener todos los blogs publicados
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }); // Solo los publicados
        res.json({
            success: true,
            blogs
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Controlador para obtener un blog por su ID
export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params; // Extraemos el ID desde los parámetros de la URL
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({
                success: false,
                message: "Blog no encontrado"
            });
        }
        res.json({
            success: true,
            blog
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Controlador para eliminar un blog por ID
export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body; // El ID viene desde el body
        await Blog.findByIdAndDelete(id);
        // eliminar todos los comentarios asociados al blog
        await Comment.deleteMany({ blog: id });
        res.json({
            success: true,
            message: "Blog eliminado"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Controlador para alternar el estado de publicación de un blog
export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body; // El ID viene desde el body
        const blog = await Blog.findById(id); // Buscamos el blog
        blog.isPublished = !blog.isPublished; // Invertimos el estado
        await blog.save(); // Guardamos los cambios
        res.json({
            success: true,
            message: "Blog actualizado"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Controlador para añadir un nuevo comentario
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({
            success: true,
            message: 'comentario añadido exitosamente'
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

// Controlador para obtener los comentarios en base un id de blog
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ CreateAt: -1 });
        res.json({
            success: true,
            comments
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}
