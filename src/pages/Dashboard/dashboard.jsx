import React from 'react'
import './dashboard.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Pomodoro from '../../Components/Pomodoro/CircleProgressBar';
import Pomodoro2 from '../../Components/Pomodoro/CircularTimer';
import Pomodoro3 from '../../Components/Pomodoro/ProgressoCircular';
const dashboard = () => {
  return (
    <>
      <Header title='Dashboard'/>
      <main>
      <Pomodoro></Pomodoro>
      <Pomodoro2></Pomodoro2>
      <Pomodoro3></Pomodoro3>
      {/* <div className="dashboard-container">
        <div className="dashboard-box1">
          <h1>Dashboard</h1>
          <p>Bem-vindo ao seu painel de controle!</p>
        </div>
        <div className="dashboard-box2">
          <h2>Informações</h2>
          <p>Aqui estão algumas informações importantes.</p>
        </div>
        <div className="dashboard-box3">
          <h2>Atividades Recentes</h2>
          <p>Veja suas atividades recentes.</p> 
        </div>

        <div className="dashboard-box4">
          <h2>Notificações</h2>
          <p>Verifique suas notificações.</p> 
        </div>
        <div className="dashboard-box5">
          <h2>Configurações</h2>
          <p>Ajuste suas configurações.</p>

        </div>
        </div> */}
        </main>
      <Footer></Footer>
    </>
  )
}

export default dashboard
