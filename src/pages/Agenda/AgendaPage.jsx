import React from 'react'
import './AgendaPage.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Agenda from '../../Components/Agenda/Agenda';
const AgendaPage = () => {
  return (
    <>
      <Header title='Agenda'/>
      <Agenda/>
      <Footer></Footer>
    </>
  )
}

export default AgendaPage
