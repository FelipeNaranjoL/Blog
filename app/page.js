// importaciones de componentes o librerias
'use client'
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";


// Archivo principal donde se subiran los componentes y servira como index o main
export default function Home() {
  return (
    <>
    {/* // componente header */}
    <Header />
    {/* // componente BlogList */}
    <BlogList/>
    {/* // componente Footer */}
    <Footer/>
    </>
  );
}

