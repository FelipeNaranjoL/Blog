import React, { useEffect, useState } from 'react'
// Importa los datos de comentarios de ejemplo y el componente para renderizar cada fila
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  // Estado que almacena todos los comentarios obtenidos del backend
  const [comments, setComments] = useState([])
  // Estado que controla el filtro de visualización: 'Aprobar' o 'Sin Aprobar'
  const [filter, setFilter] = useState('Sin Aprobar')

  const { axios } = useAppContext() // Extrae axios del contexto global

  // Función para obtener los comentarios desde el backend
  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      // Si la petición es exitosa, se actualiza el estado con los comentarios
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // useEffect que ejecuta fetchComments al montar el componente
  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      {/* -------------------- Encabezado con título y filtros -------------------- */}
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comentarios</h1>
        <div className='flex gap-4'>
          {/* Botón para mostrar solo comentarios aprobados */}
          <button
            onClick={() => setFilter('Aprobar')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Aprobar' ? 'text-primary' : 'text-gray-700'}`}
          >
            Aprobado
          </button>

          {/* Botón para mostrar solo comentarios no aprobados */}
          <button
            onClick={() => setFilter('No aprobar')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Sin Aprobar' ? 'text-primary' : 'text-gray-700'}`}
          >
            Sin Aprobar
          </button>
        </div>
      </div>

      {/* -------------------- Tabla de comentarios -------------------- */}
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-black'>
          <thead className='text-xs text-black text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Título y comentario del blog</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Fecha</th>
              <th scope='col' className='px-6 py-3'>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* Filtra los comentarios según el estado de aprobación */}
            {comments
              .filter((comment) => {
                if (filter === "Aprobar") return comment.isApproved === true
                return comment.isApproved === false
              })
              .map((comment, index) => (
                // Renderiza cada comentario usando CommentTableItem
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1} // Muestra número de fila
                  fetchComments={fetchComments} // Permite refrescar la lista tras acciones
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
