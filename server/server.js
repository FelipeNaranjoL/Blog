import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// 👇 Con top-level await (válido porque usas "type": "module")
// Conecta a la base de datos MongoDB
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
// Ruta de prueba principal
app.get('/', (req, res) => res.send("Api funcional"));

// 🔹 Aquí usamos el router de administración
// Todas las rutas definidas en adminRouter quedarán prefijadas con "/api/admin"
// Ejemplo: POST /api/admin/login
app.use("/api/admin", adminRouter)

app.use("/api/blog",blogRouter)

// Puerto
const PORT = process.env.PORT || 3000;

// Servidor en marcha
app.listen(PORT, () => {
    console.log("Server funcional en el puerto " + PORT);
});

// Exportación para pruebas o testeo
export default app;
