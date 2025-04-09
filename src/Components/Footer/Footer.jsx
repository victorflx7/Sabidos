import './Footer.css'

import IconInsta from '../assets/react.svg'
import IconX from '../assets/react.svg'
import IconGithub from '../assets/react.svg'

   
function Footer() {

  return (
        <>
            <footer >
            <div className="Redes">
                    <img src={IconInsta} alt="Logo_Instagram" className="LOGREDES"/>
                     <img src={IconX} alt="Logo_Twitter_X" className="LOGREDES" />
                    <img src={IconGithub} alt="Logo_GitHub" className="LOGREDES" />
                 </div>

                 <div className="Centrado">
                    <p id="pfoo" className="texto Centrado">
                        © 2024 Sabidos. Todos os direitos reservados.
                    </p>
                </div>
                <div className="List">
                    <ul>
                        <li>item</li>
                        <li>item</li>
                        <li>item</li>
                        <li>item</li>
                    </ul>
                </div>
            </footer>
        </>
  )
}

export default Footer
