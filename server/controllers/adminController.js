import jwt from 'jsonwebtoken'

// Controlador de login de administrador
export const adminLogin = async (req, res) => {
    try {
        // Extraemos credenciales del body
        const { email, pass } = req.body;

        // Verificación simple contra variables de entorno
        if (email !== process.env.ADMIN_EMAIL || pass !== process.env.ADMIN_PASS) {
            return res.json({
                success: false,
                message: "Credenciales incorrectas",
            });
        }

        // Generamos el token JWT
        // ⚠️ Importante: conviene agregar `expiresIn` para que no sea válido indefinidamente
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Respuesta exitosa con el token
        res.json({ success: true, token });
    } catch (error) {
        // Si ocurre un error inesperado, lo devolvemos
        res.json({ success: false, message: error.message });
    }
};
