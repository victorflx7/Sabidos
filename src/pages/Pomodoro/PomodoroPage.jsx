import React from 'react'
import './PomodoroPage.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Pomo from '../../Components/Pomodoro/CircularTimer';

const PomodoroPage = () => {
  return (
    <>
      <Header title='Pomodoro'/>
      <main>
      <Pomo/>
      </main>
      <Footer></Footer>
    </>
  )
}

export default PomodoroPage
