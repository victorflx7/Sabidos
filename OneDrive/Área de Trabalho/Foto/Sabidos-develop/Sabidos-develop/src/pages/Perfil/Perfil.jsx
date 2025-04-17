import React from 'react'
import './dashboard.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Perfil from '../../Components/Perfil/Perfil';
const dashboard = () => {
  return (
    <>
      <Header title='Dashboard'/>
      <Perfil/>
      <Footer></Footer>
    </>
  )
}

export default dashboard
