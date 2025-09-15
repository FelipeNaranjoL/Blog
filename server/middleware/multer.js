import multer from "multer"; // Importa multer para manejar la subida de archivos

// Configuración de multer usando memoryStorage
// Esto significa que los archivos se almacenan en memoria (buffer) temporalmente
const upload = multer({ storage: multer.memoryStorage() });

export default upload; // Exporta la configuración para usarla en rutas que reciben archivos
