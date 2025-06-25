import { useEffect, useState } from 'react'
import './SwitchModo.css'

function SwitchModo() {

  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
      document.body.classList.add('dark-mode');
      setModoEscuro(true);
    } else {
      document.body.classList.add('light-mode');
    }
  }, []);

  const alternarTema = () => {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);

    if (novoModo) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('tema','dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('tema','light');
  }
};

    return (
      
        <div className="toggle-switch">
          <input type="checkbox" 
          id="toggle"
          checked={modoEscuro}
          onChange={alternarTema}/>
          <label htmlFor="toggle" className="toggle-label">
            <span className="slider">
              <span className="ray top"></span>
              <span className="ray left"></span>
              <span className="ray bottom"></span>
              </span>
          </label>
        </div>
    );
  }
  
  export default SwitchModo