

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  

  return (
    <div className="container">
      <div className="bloco esquerda">
        <img src="frame2.svg" className='logo1' alt="Logo"/>
        <p className='texto1'>Organize seus estudos <br /> de forma <span className="sublinhado">fácil</span></p>
        <button className='botao'>
          <Link to="/cadastro">Cadastre-se ! É grátis</Link>
        </button>
        <Link to="/login" className='sub'><br />Já tem uma conta? Entre !</Link>
      </div>
      
      <section className='secLateral'>
        
          <div className="bloco direita">
            <p className='texto2'>Trabalhe de qualquer lugar</p>
            <div className='bloco2'>
              <img src="logo2.svg" className='logo2'/>
              <p className='texto3'>
                Mantenha as informações<br />
                importantes à mão; suas<br />
                notas sincronizam<br />
                automaticamente em todos<br />
                os seus dispositivos.
              </p>
            </div>
          </div>
          <div className="bloco direita">
            <p className='texto2'>2 Trabalhe de qualquer lugar</p>
            <div className='bloco2'>
              <img src="logo2.svg" className='logo2'/>
              <p className='texto3'>
                Mantenha as informações<br />
                importantes à mão; suas<br />
                notas sincronizam<br />
                automaticamente em todos<br />
                os seus dispositivos.
              </p>
            </div>
          </div>

          <div className="bloco direita">
            <p className='texto2'> 3 Trabalhe de qualquer lugar</p>
            <div className='bloco2'>
              <img src="logo2.svg" className='logo2'/>
              <p className='texto3'>
                Mantenha as informações<br />
                importantes à mão; suas<br />
                notas sincronizam<br />
                automaticamente em todos<br />
                os seus dispositivos.
              </p>
            </div>
          </div>
        

          <div className="bloco direita">
            <p className='texto2'> 4 Trabalhe de qualquer lugar</p>
            <div className='bloco2'>
              <img src="logo2.svg" className='logo2'/>
              <p className='texto3'>
                Mantenha as informações<br />
                importantes à mão; suas<br />
                notas sincronizam<br />
                automaticamente em todos<br />
                os seus dispositivos.
              </p>
            </div>
          </div>
        

          <div className="bloco direita">
            <p className='texto2'> 5 Trabalhe de qualquer lugar</p>
            <div className='bloco2'>
              <img src="logo2.svg" className='logo2'/>
              <p className='texto3'>
                Mantenha as informações<br />
                importantes à mão; suas<br />
                notas sincronizam<br />
                automaticamente em todos<br />
                os seus dispositivos.
              </p>
            </div>
          </div>
        
      </section>
    </div>
  );
}

