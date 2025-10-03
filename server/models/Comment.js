import mongoose from "mongoose";

// 📌 Definimos el esquema para los comentarios
// Un esquema en Mongoose describe la estructura de los documentos
// que se almacenarán en la colección de MongoDB.
const commentSchema = new mongoose.Schema({
    // Relación con el modelo Blog. Guardamos el ID del blog asociado
    // y lo referenciamos para poder hacer "populate" en consultas.
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },

    // Nombre del usuario que hace el comentario
    name: { type: String, required: true },

    // Contenido del comentario
    content: { type: String, required: true },

    // Indica si el comentario fue aprobado por un administrador/moderador
    isApproved: { type: Boolean, default: false },
}, 
// 📌 timestamps: true añade automáticamente
// dos campos en cada documento: 
// createdAt (fecha de creación) y updatedAt (última actualización)
{ timestamps: true });

// 📌 Creamos el modelo "comentario" a partir del esquema.
// Este modelo es el que usaremos para interactuar con la colección "blogs"
// en la base de datos (por defecto Mongoose pluraliza el nombre).
const Comment = mongoose.model('Comment', commentSchema);

// 📌 Exportamos el modelo para usarlo en controladores y rutas
export default Comment;
