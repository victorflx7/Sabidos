import './SlideBar2.css'
import IconX from './icon/react.svg'
import IconHouse from './icon/House.svg'
import IconAgend from './icon/Agend.svg'
import IconPen from './icon/Pen.svg'
import IconTime from './icon/Time.svg'
import IconCard from './icon/Cards.svg'

function SlideBar2() {

    return (
      <>
             <div class="drop nalinha">
              <a>
                <img src={IconX} id="imgbarle01"/></a>
               
               
              <div class="dropdownmenu">
                <div class="drop">
              <img src={IconX} id="imgbarle01"/></div>
              
                  <a><img src={IconHouse} alt="" srcset="" />Home</a>
                  <a ><img src={IconAgend} alt="" srcset="" /> Agenda</a>
                  <a ><img src={IconPen} alt="" srcset="" /> Resumos</a>
                  <a > <img src={IconTime} alt="" srcset="" /> Pomodoro</a>
                  <a > <img src={IconCard} alt="" srcset="" /> Flashcards</a>
                  <a href=""></a>
                  <a href=""></a>
                  
                  <a href="">Sobre Nos</a>

                  <div class="animated-div">
                      <div class="animated-div2">
                      </div>
                  </div>

                

              </div>
          </div>
      </>
    )
  }
  
  export default SlideBar2