import './Header.css'
import IconProfile from './IconProfile/IconProfile'
import SlideBar2 from './SlideBarcopy/SlideBar2'
import SlideBar from './SlideBar/SlideBar'
import SwitchModo from './SwitchModo/SwitchModo'


function Header() {

  return (
    <>
    <header>
      <div className='ajust'>
        <SlideBar2></SlideBar2>  
        </div>
        <h1 className='title'>Titulo</h1>
      <div className='controle'>
        <SwitchModo></SwitchModo>
        <IconProfile></IconProfile>
      </div>
    </header>
    </>
  )
}

export default Header