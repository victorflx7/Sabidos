import './SlideBar.css'
import { Link } from 'react-router-dom';

function SlideBar() {

    return (
      <>
             <div className="drop nalinha">
              <a>
                <img src= './icon/Barras.svg' id="imgbarle01"/></a>
               
               
              <div className="dropdownmenu">
                <div className="drop">
              <img src='./icon/Barras.svg' id="imgbarle01"/></div>
              
                  <a><img src='icon/House.svg' alt=""  />Home</a>
                  <Link to="/Agenda"><img src='icon/Agend.svg' alt=""  /> Agenda</Link>
                  <Link to="/Resumo"> <img src='icon/Pen.svg' alt=""  /> Resumos</Link>
                  <a > <img src='icon/Time.svg' alt=""  /> Pomodoro</a>
                  <a > <img src='icon/Cards.svg' alt=""  /> Flashcards</a>
                  
                  <br /><br />
                  
                  <a href="">Sobre Nos</a>

                  <div className="animated-div">
                      <div className="animated-div2">
                      </div>
                  </div>

                

              </div>
          </div>
      </>
    )
  }
  
  export default SlideBar
