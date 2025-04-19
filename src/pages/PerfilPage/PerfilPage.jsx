import React from 'react'
import './PerfilPage.css'
import Header from '../../Components/Header/Header';
import Perfil from '../../Components/Perfil/Perfil';
import Footer from '../../Components/Footer/Footer';

const PrefilPage = () => {
  return (
    <>
      <Header title='Resumo'/>
      <Perfil/>
      <Footer></Footer>
    </>
  )
}

export default PrefilPage
