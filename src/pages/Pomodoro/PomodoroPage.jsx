import React from 'react'
import './PomodoroPage.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Pomodoro from '../../Components/Pomodoro/ProgressoCircular';

const PomodoroPage = () => {
  return (
    <>
      <Header title='Pomodoro'/>
      <Pomodoro></Pomodoro>
      <Footer></Footer>
    </>
  )
}

export default PomodoroPage
