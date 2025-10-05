import mongoose from "mongoose";

// 📌 Definimos el esquema para los blogs
// Un esquema en Mongoose describe la estructura de los documentos
// que se almacenarán en la colección de MongoDB.
const blogSchema = new mongoose.Schema({
    // Título del blog (obligatorio)
    title: { type: String, required: true },

    // Subtítulo del blog (opcional)
    subTitle: { type: String },

    // Descripción principal del blog (obligatoria)
    description: { type: String, required: true },

    // Categoría del blog (obligatoria, ej: "tecnología", "deportes")
    category: { type: String, required: true },

    // URL de la imagen asociada al blog (obligatoria)
    image: { type: String, required: true },

    // Estado de publicación (true = publicado, false = borrador)
    isPublished: { type: Boolean, required: true },
}, 
// 📌 timestamps: true añade automáticamente
// dos campos en cada documento: 
// createdAt (fecha de creación) y updatedAt (última actualización)
{ timestamps: true });

// 📌 Creamos el modelo "Blog" a partir del esquema.
// Este modelo es el que usaremos para interactuar con la colección "blogs"
// en la base de datos (por defecto Mongoose pluraliza el nombre).
const Blog = mongoose.model('Blog', blogSchema);

// 📌 Exportamos el modelo para usarlo en controladores y rutas
export default Blog;
