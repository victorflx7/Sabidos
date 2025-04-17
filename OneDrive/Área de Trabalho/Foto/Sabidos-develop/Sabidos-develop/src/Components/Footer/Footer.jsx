import './Footer.css'


   
function Footer() {

  return (
        <>
            <footer >
            <div className="Redes">
                    <img src="/assets/Vectorreal github icon.svg" alt="Logo_Instagram" className="LOGREDES"/>
                     <img src="/assets/Vectorreal icon Inta.svg" alt="Logo_Twitter_X" className="LOGREDES" />
                    <img src="/assets/Vectorreal icon X.svg" alt="Logo_GitHub" className="LOGREDES" />
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
