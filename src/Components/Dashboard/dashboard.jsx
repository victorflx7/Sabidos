import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
        <div className='Dashboard'>
                <div className='mensagemSabido'>
                    <img src='sabidoOfechado.svg' className='imgSabido'></img>
                    <div className='cont'>
                        <div className='cxpTxt'>
                            <p className='txtSabido'>Opa sabido! Já checou suas notas<br /> hoje?</p>
                            <p className='txtSabido'>Bons estudos, mantenha o foco.</p>
                        </div>
                    </div>
                </div>

                <div className='atEinf'>

                    <div className="atalhos">
                        <div className='contencao'>
                            <Link to='/Agenda'><div className="circulo circulo1"><img src="diario.svg" alt="icone 1" style={{width: '28px'}} /></div></Link>
                            <Link to='/Resumo'><div className="circulo circulo2"><img src="notas.svg" alt="icone 2" style={{width: '25px'}} /></div></Link>
                            <Link to='/Pomodoro'><div className="circulo circulo3"><img src="ampulheta.svg" alt="icone 3" style={{width: '20px'}} /></div></Link>
                            <Link to='Flashcard'><div className="circulo circulo4"><img src="caarta.svg" alt="icone 4" style={{width: '28px'}} /></div></Link>
                            <Link to=''><div className="circulo circulo5"><img src="grupo.svg" alt="icone 5" style={{width: '28px'}} /></div></Link>
                            <div className="circulo-central"><img src="sabidoOutline.svg" alt="icone central" style={{width: '85px'}} /></div>
                        </div>
                    </div>



                    <div className='infos'>

                    </div>

                </div>
        </div>
    </>
    )
}

export default Dashboard;