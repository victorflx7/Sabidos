import './Footer.css'

import IconInsta from '../assets/react.svg'
import IconX from '../assets/react.svg'
import IconGithub from '../assets/react.svg'

   
function Footer() {

  return (
        <>
            <footer >
            <div class="Redes">
                    <img src={IconInsta} alt="Logo_Instagram" class="LOGREDES"/>
                     <img src={IconX} alt="Logo_Twitter_X" class="LOGREDES" />
                    <img src={IconGithub} alt="Logo_GitHub" class="LOGREDES" />
                 </div>

                 <div class="Centrado">
                    <p id="pfoo" class="texto Centrado">
                        © 2024 Sabidos. Todos os direitos reservados.
                    </p>
                </div>
                <div class="List">
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
