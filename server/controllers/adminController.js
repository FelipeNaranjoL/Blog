import jwt from 'jsonwebtoken'

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

        // Respuesta exitosa con el token
        res.json({ success: true, token });
    } catch (error) {
        // Si ocurre un error inesperado, lo devolvemos
        res.json({ success: false, message: error.message });
    }
};