import React, { useEffect, useRef, useState } from 'react'
// Importa assets (imágenes, iconos) y categorías de blog predefinidas
import { assets, blogCategories } from '../../assets/assets'
// Importa Quill, editor de texto enriquecido
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext'; // Contexto global con axios
import toast from 'react-hot-toast'; // Para notificaciones tipo toast

const Addblog = () => {
  const { axios } = useAppContext(); // Extraemos axios del contexto
  const [isAdding, setIsAdding] = useState(false) // Estado para mostrar si se está enviando el blog

  // Referencia al div que contendrá el editor Quill
  const editorRef = useRef(null);
  // Referencia para almacenar la instancia de Quill y evitar reinicializaciones
  const quillrRef = useRef(null);

  // Estados del formulario
  const [image, setImage] = useState(null); // Imagen seleccionada
  const [title, setTitle] = useState('');   // Título del blog
  const [subTitle, setSubTitle] = useState(''); // Subtítulo del blog
  const [category, setCategory] = useState('Startup'); // Categoría seleccionada
  const [isPublished, setIsPublished] = useState(false); // Checkbox de publicación

  // Función para generar contenido con IA (placeholder, aún no implementada)
  const generateContent = async (e) => {

  }

  // Función que maneja el envío del formulario al backend
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault(); // Previene la recarga de la página
      setIsAdding(true)   // Activa indicador de envío

      // Creamos el objeto blog con todos los campos
      const blog = {
        title,
        subTitle,
        description: quillrRef.current.root.innerHTML, // Contenido del editor Quill
        category,
        isPublished
      }

      // Preparamos FormData para enviar archivo y datos juntos
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      // Petición POST al backend para añadir el blog
      const { data } = await axios.post('/api/blog/add', formData);

      if(data.success){
        toast.success(data.message) // Muestra notificación de éxito
        setImage(false)             // Resetea la imagen
        setTitle('')                // Resetea el título
        quillrRef.current.root.innerHTML = '' // Resetea el contenido de Quill
        setCategory('Startup')      // Resetea categoría
      } else {
        toast.error(data.message)   // Notificación de error
      }
    } catch (error) {
      toast.error(error.message)    // Notificación de error si falla la petición
    } finally {
      setIsAdding(false)            // Desactiva indicador de envío
    }
  }

  // Inicializa el editor Quill solo una vez al montar el componente
  useEffect(() => {
    if (!quillrRef.current && editorRef.current) {
      quillrRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form
      onSubmit={onSubmitHandler} // Llama la función al enviar el formulario
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

        {/* Sección de subida de imagen */}
        <p>Subir Blog</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area} // Muestra la imagen seleccionada o placeholder
            alt="preview"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])} // Guarda la imagen en el estado
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Campo de título */}
        <p>Titulo del blog</p>
        <input
          type="text"
          placeholder='Ingresar aqui'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={e => setTitle(e.target.value)} // Actualiza el estado del título
          value={title}
        />

        {/* Campo de subtítulo */}
        <p>Subtitulo</p>
        <input
          type="text"
          placeholder='Ingresar aqui'
          required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          onChange={e => setSubTitle(e.target.value)} // Actualiza el estado del subtítulo
          value={subTitle}
        />

        {/* Editor de contenido */}
        <p>Descripcion</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div> {/* Div que contiene Quill */}
          <button
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
            type='button'
            onClick={generateContent} // Genera contenido con IA
          >
            Generar con IA
          </button>
        </div>

        {/* Selección de categoría */}
        <p>Categoria</p>
        <select
          onChange={e => setCategory(e.target.value)} // Actualiza categoría
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
          name="category"
        >
          <option value="">Selecciona la categoria</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        {/* Checkbox de publicación */}
        <div className='flex gap-2 mt-4'>
          <p>Publicar ahora</p>
          <input
            type="checkbox"
            checked={isPublished}
            className='scale-125 cursor-pointer'
            onChange={e => setIsPublished(e.target.checked)} // Actualiza estado de publicación
          />
        </div>

        {/* Botón para enviar formulario */}
        <button
          disabled={isAdding} // Deshabilita si ya se está agregando
          type="submit"
          className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer'
        >
          {isAdding ? 'Añadiendo...' : 'Añadir Blog'} {/* Cambia el texto según estado */}
        </button>
      </div>
    </form>
  )
}

export default Addblog
