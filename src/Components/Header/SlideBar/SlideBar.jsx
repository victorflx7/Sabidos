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
              
              <Link to="/dashboard"><img src='icon/House.svg' className="logo12"alt="" srcset="" />Home</Link>
                  <Link to="/Agenda"><img src='icon/Agend.svg' className="logo12"alt="" srcset="" /> Agenda</Link>
                  <Link to="/Resumo"> <img src='icon/Pen.svg' className="logo12"alt="" srcset="" /> Resumos</Link>
                  <Link to="/Pomodoro"> <img src='icon/Time.svg' className="logo12"alt="" srcset="" /> Pomodoro</Link>
                  <Link to="/Flashcard"> <img src='icon/Cards.svg' className="logo12"alt="" srcset="" /> Flashcards</Link>
                  <br /><br />
                  
                  <a href="/sobrenos">
  <img src='icon/About.svg' className="logo12"/>
  <span>Sobre nós</span>
</a>

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
