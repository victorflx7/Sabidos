import './SlideBar.css'
import IconX from './icon/Barras.svg'
import IconHouse from './icon/House.svg'
import IconAgend from './icon/Agend.svg'
import IconPen from './icon/Pen.svg'
import IconTime from './icon/Time.svg'
import IconCard from './icon/Cards.svg'

function SlideBar() {

    return (
      <>
             <div class="dropdown nalinha">
              <a>
                <img src={IconX} id="imgbarle1"/></a>
               {/*   <img  style="margin: 25px 40px 20px 40px;" alt="Menu" id="imgbarle2" class=" desap" />
                  <img  style="margin: 25px 40px 20px 20px;" alt="Menu" id="imgbarle1" class="" />*/}
              
               
              <div class="dropdown-menu">
                  <a><img src={IconHouse} alt="" srcset="" />Home</a>
                  <a ><img src={IconAgend} alt="" srcset="" /> Agenda</a>
                  <a ><img src={IconPen} alt="" srcset="" /> Resumos</a>
                  <a > <img src={IconTime} alt="" srcset="" /> Perfil</a>
                  <a > <img src={IconCard} alt="" srcset="" /> Perfil</a>
                  <div class="animated-div">
                      <div class="animated-div2">
                      </div>
                  </div>

                

              </div>
          </div>
      </>
    )
  }
  
  export default SlideBar