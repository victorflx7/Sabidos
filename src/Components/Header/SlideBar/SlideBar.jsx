import './SlideBar.css'
import { Link } from 'react-router-dom';

function SlideBar() {

    return (
      <>
             <div class="drop nalinha">
              <a>
                <img src= './icon/Barras.svg' id="imgbarle01"/></a>
               
               
              <div class="dropdownmenu">
                <div class="drop">
              <img src='./icon/Barras.svg' id="imgbarle01"/></div>
              
                  <a><img src='icon/House.svg' alt="" srcset="" />Home</a>
                  <Link to="/Agenda"><img src='icon/Agend.svg' alt="" srcset="" /> Agenda</Link>
                  <Link to="/Resumo"> <img src='icon/Pen.svg' alt="" srcset="" /> Resumos</Link>
                  <Link to="/Pomodoro"> <img src='icon/Time.svg' alt="" srcset="" /> Pomodoro</Link>
                  <Link to="/Flashcard"> <img src='icon/Cards.svg' alt="" srcset="" /> Flashcards</Link>
                  
                  <br /><br />
                  
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
  
  export default SlideBar
