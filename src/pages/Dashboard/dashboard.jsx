import React from 'react'
import './dashboard.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Dashboard from '../../Components/Dashboard/dashboard'

const dashboard = () => {
  return (
    <>
      <Header title='Dashboard'/>
      <Dashboard></Dashboard>
      <Footer></Footer>
    </>
  )
}

export default dashboard
