import './SlideBar.css'


function SlideBar() {

    return (
      <>
             <div class="dropdown nalinha">
              <a>
                <img src="icon/Baras.svg" id="imgbarle1"/></a>
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