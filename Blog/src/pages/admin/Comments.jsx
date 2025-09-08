import React, { useEffect, useState } from 'react'
// Importa los datos de comentarios de ejemplo y el componente para renderizar cada fila
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'

const Comments = () => {
  // Estado para almacenar todos los comentarios
  const [comments, setComments] = useState([])
  // Estado para controlar el filtro de aprobación
  const [filter, setFilter] = useState('Sin Aprobar')

  // Función para obtener los comentarios (simulado con datos locales)
  const fetchComments = async () => {
    setComments(comments_data)
  }

  // Ejecuta fetchComments al montar el componente
  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      {/* Encabezado con título y botones de filtro */}
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comentarios</h1>
        <div className='flex gap-4'>
          {/* Botón para mostrar solo comentarios aprobados */}
          <button 
            onClick={() => setFilter('Aprobar')} 
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Aprobar' ? 'text-primary' : 'text-gray-700'}`}
          >
            Aprobar
          </button>
          {/* Botón para mostrar solo comentarios no aprobados */}
          <button 
            onClick={() => setFilter('No aprobar')} 
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'No aprobar' ? 'text-primary' : 'text-gray-700'}`}
          >
            No aprobar
          </button>
        </div>
      </div>

      {/* Tabla que muestra los comentarios filtrados */}
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Titulo y comentario del blog</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Fecha</th>
              <th scope='col' className='px-6 py-3'>Accion</th>
            </tr>
          </thead>
          <tbody>
            {/* Filtra los comentarios según el estado de aprobación */}
            {comments
              .filter((comment) => {
                if(filter === "Aprobar") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment,index) => (
                // Renderiza cada comentario usando CommentTableItem
                <CommentTableItem 
                  key={comment._id} 
                  comment={comment} 
                  index={index + 1} 
                  fetchComments={fetchComments} 
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
