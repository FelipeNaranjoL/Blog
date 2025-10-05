import React from 'react'

// Importación de componentes reutilizables
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Encabezado con buscador */}
      <Header />

      {/* Listado de publicaciones */}
      <BlogList />

      {/* Sección de suscripción al newsletter */}
      {/* <Newsletter /> */}

      {/* Pie de página */}
      <Footer />
    </>
  )
}

export default Home
