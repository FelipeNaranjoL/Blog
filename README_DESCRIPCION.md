# 🧠 Proyecto **Blog — Full Stack MERN**

Un sistema completo de **blog personal y panel de administración**, desarrollado con **React + Vite (frontend)** y **Node.js + Express + MongoDB (backend)**.  
Incluye autenticación, carga de imágenes (ImageKit) y panel admin protegido por JWT.

---

## 📂 Estructura del Proyecto

```
Blog/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   ├── BlogCards.jsx
│   │   ├── BlogList.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   └── Newsletter.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── admin/
│   │   ├── Blog.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── vite.config.js
└── server/
    ├── configs/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

---

## ⚛️ **Frontend (React + Vite)**

### 📁 `/src/components/`
Componentes reutilizables del frontend, tanto para el sitio público como para el panel admin.

#### 🧩 **Admin**
- **`BlogTableItem.jsx`** → Renderiza una fila individual dentro de la tabla de blogs (título, fecha, acciones).  
- **`CommentTableItem.jsx`** → Muestra comentarios en la tabla del panel admin.  
- **`Login.jsx`** → Formulario de inicio de sesión para el administrador (con autenticación vía backend).  
- **`Sidebar.jsx`** → Menú lateral del panel admin con enlaces al dashboard y secciones internas.

#### 🌐 **Generales**
- **`BlogCards.jsx`** → Tarjetas de vista previa de blogs (imagen, resumen, enlace).  
- **`BlogList.jsx`** → Lista completa de blogs mostrada en la página principal.  
- **`Footer.jsx`** → Pie de página con redes sociales y créditos.  
- **`Header.jsx`** → Encabezado o banner principal.  
- **`Loading.jsx`** → Indicador de carga mientras se obtienen datos del backend.  
- **`Navbar.jsx`** → Barra superior de navegación (inicio, blogs, etc.).  
- **`Newsletter.jsx`** → Formulario de suscripción al boletín de noticias.

---

### 📁 `/src/context/`
- **`AppContext.jsx`** → Contexto global con React Context API.  
  Maneja variables compartidas como el token de sesión o la instancia de Axios.

---

### 📁 `/src/pages/`

#### 👥 **Públicas**
- **`Home.jsx`** → Página de inicio, muestra los blogs recientes.  
- **`Blog.jsx`** → Página de detalle de un blog individual con comentarios.

#### 🔒 **Admin**
- **`AddBlog.jsx`** → Formulario para crear un nuevo blog (imagen + texto).  
- **`Comments.jsx`** → Vista para gestionar comentarios.  
- **`Dashboard.jsx`** → Panel de control principal del admin.  
- **`Layout.jsx`** → Plantilla base del panel (contiene `Sidebar` y `<Outlet />`).  
- **`ListBlog.jsx`** → Lista de todos los blogs con opciones de edición o eliminación.

---

### 📄 **App.jsx**
Define las rutas principales con `react-router-dom`.  
Incluye rutas públicas y protegidas por autenticación.

### 📄 **main.jsx**
Punto de entrada del frontend.  
Renderiza la aplicación dentro del DOM, incluyendo el router y el proveedor de contexto.

### 🎨 **index.css**
Estilos globales del proyecto (fuentes, colores y márgenes base).

### 🌐 **index.html**
Plantilla principal de Vite donde React monta la app.

### ⚙️ **vite.config.js**
Configuración de Vite (puerto, alias y plugins).

### 🔒 **.env**
Contiene variables como `VITE_BASE_URL=http://localhost:3000`.

---

## 🖥️ **Backend (Node.js + Express + MongoDB)**

### 📁 `/server/configs/`
- **`db.js`** → Conexión a la base de datos MongoDB usando Mongoose.  
- **`imageKit.js`** → Configuración del SDK de ImageKit para subir imágenes.

---

### 📁 `/server/controllers/`
- **`adminController.js`** → Lógica del administrador: login, gestión de blogs y validación.  
- **`blogController.js`** → Lógica pública: obtener blogs, crear comentarios, etc.

---

### 📁 `/server/middleware/`
- **`auth.js`** → Middleware para verificar el token JWT del administrador.  
- **`multer.js`** → Configura `multer` para manejar la carga de imágenes.

---

### 📁 `/server/models/`
- **`Blog.js`** → Esquema Mongoose del modelo de blog (título, imagen, contenido, fecha).  
- **`Comment.js`** → Esquema Mongoose para los comentarios (nombre, texto, id del blog).

---

### 📁 `/server/routes/`
- **`adminRoutes.js`** → Rutas protegidas para el administrador (`/api/admin/...`).  
- **`blogRoutes.js`** → Rutas públicas del sitio (`/api/blog/...`).

---

### 📄 **server.js**
Archivo principal del backend:  
- Configura Express y middlewares (`cors`, `json`, `auth`, etc.).  
- Conecta con MongoDB.  
- Monta las rutas de la API.  
- Escucha en el puerto definido en `.env`.

---

### 📄 **vercel.json**
Configuración de despliegue para Vercel (manejo de rutas y API functions).

### 📄 **package.json**
Lista dependencias y scripts del backend (`express`, `mongoose`, `cors`, `multer`, etc.).

---

## ⚙️ **Resumen General**

| Módulo | Función |
|--------|----------|
| 🧠 `src/context/` | Estado global y autenticación |
| 🧩 `src/components/` | Componentes visuales reutilizables |
| 📄 `src/pages/` | Páginas principales del sitio |
| ⚙️ `server/` | Lógica del backend y conexión a la base de datos |
| 🌐 `.env` | Variables de entorno y configuración local |

---

## 🚀 Tecnologías Principales

| Tipo | Herramientas |
|------|---------------|
| **Frontend** | React, Vite, TailwindCSS, React Router, Axios |
| **Backend** | Node.js, Express, Mongoose, ImageKit, Multer |
| **Base de Datos** | MongoDB Atlas |
| **Autenticación** | JSON Web Token (JWT) |
| **Despliegue** | Vercel |
