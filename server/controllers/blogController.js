import imagekit from "../configs/imageKit.js"; // Importa la configuración de ImageKit para subir y optimizar imágenes
import Blog from "../models/Blog.js"; // Importa el modelo de Blog de MongoDB

export const addBlog = async (req, res) => {
    try {
        // Parseamos los datos enviados desde el cliente, que vienen como un string JSON en req.body.blog
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        // Obtenemos el archivo de imagen subido con multer desde req.file
        const imageFile = req.file;

        // Validación: si falta algún campo obligatorio, devolvemos un mensaje de error
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Campos vacíos o mal insertados"
            });
        }

        // Subimos la imagen directamente a ImageKit usando el buffer del archivo
        const response = await imagekit.upload({
            file: imageFile.buffer, // Archivo en memoria
            fileName: imageFile.originalname, // Nombre original del archivo
            folder: "/blogs" // Carpeta donde se guardará en ImageKit
        });

        // Creamos una URL optimizada de la imagen con transformación automática
        const optimizedImageUrl = imagekit.url({
            path: response.filePath, // Ruta del archivo subido
            transformation: [
                { quality: 'auto' }, // Optimiza la calidad automáticamente
                { format: 'webp' },  // Convierte a formato webp
                { width: "1280" }    // Ajusta el ancho a 1280px
            ]
        });

        // Creamos un nuevo documento de Blog en la base de datos con los datos proporcionados
        await Blog.create({
            title, 
            subTitle, 
            description, 
            category, 
            image: optimizedImageUrl, // Guardamos la URL optimizada
            isPublished
        });

        // Respondemos al cliente confirmando que el blog fue añadido correctamente
        res.json({
            success: true,
            message: "Blog añadido"
        });

    } catch (error) {
        // Si ocurre un error, lo devolvemos en la respuesta
        res.json({
            success: false,
            message: error.message
        });
    }
};
