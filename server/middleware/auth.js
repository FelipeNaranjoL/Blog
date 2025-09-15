import jwt from "jsonwebtoken"; // Importa jsonwebtoken para verificar tokens JWT

// Middleware de autenticación
const auth = (req, res, next) => {
    const token = req.headers.authorization; // Obtiene el token enviado en el header Authorization

    try {
        // Verifica el token usando la clave secreta
        jwt.verify(token, process.env.JWT_SECRET)
        next(); // Si el token es válido, continúa con la siguiente función/middleware
    } catch (error) {
        // Si el token es inválido o no existe, responde con un mensaje de error
        res.json({
            success: false,
            message: "Token invalida"
        })
    }
}

export default auth; // Exporta el middleware para usarlo en rutas protegidas
