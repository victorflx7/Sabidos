import React from 'react'
import './ResumoPage.css'
import Header from '../../Components/Header/Header';
import Resumo from '../../Components/Resumo/resumo';
import Footer from '../../Components/Footer/Footer';

const ResumoPage = () => {
  return (
    <>
      <Header title='Resumo'/>
      <Resumo></Resumo>
      <Footer></Footer>
    </>
  )
}

export default ResumoPage
