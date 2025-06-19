import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import  FraseDoDia from "../FraseDoDia/FraseDoDia";

const Dashboard = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.id;
    return (
        <>
            <div className='Dashboard'>
                    <img src='sabidoOfechado.svg' className='imgSabido'></img>
                <div className='mensagemSabido'>
                    <div className='cont'>
                        <div className='cxpTxt'>
                            <p className='txtSabido'>Olá {user?.displayName} !</p>
                            <p className='txtSabido'>Pronto para estudar hoje?</p>
                        </div>
                    </div>
                </div>

                <div className='atEinf'>

                    <div className="atalhos">
                        <div className='contencao'>
                            <Link to='/Agenda'><div className="circulo circulo1"><img src="diario.svg" alt="icone 1" style={{ width: '28px' }} /></div></Link>
                            <Link to='/Resumo'><div className="circulo circulo2"><img src="notas.svg" alt="icone 2" style={{ width: '25px' }} /></div></Link>
                            <Link to='/Pomodoro'><div className="circulo circulo3"><img src="ampulheta.svg" alt="icone 3" style={{ width: '20px' }} /></div></Link>
                            <Link to='Flashcard'><div className="circulo circulo4"><img src="caarta.svg" alt="icone 4" style={{ width: '28px' }} /></div></Link>
                            <Link to=''><div className="circulo circulo5"><img src="grupo.svg" alt="icone 5" style={{ width: '28px' }} /></div></Link>
                            <div className="circulo-central"><img src="sabidoOutline.svg" alt="icone central" style={{ width: '85px' }} /></div>
                        </div>
                    </div>


                    <div className="infos">
                        <div className="tempo_estudo">
                                <div className='contencao_svgte'>
                                    <div className='blcsvg_do_te'>
                                        <img src='' className=''>
    
                                        </img>
                                    </div>
                                </div>
                                <div className='blc_do_te'>
                                    <div className="text_estudo">Você estudou por:</div>
                                    <div className="tempo_valor">2 H</div>
                                </div>
                        </div>

                        <div className="estatisticas">
                            <div className="itens_ferramentas">
                                <div className="top-square"></div>
                                <div className="item-nome">Notas</div>
                                <div className="item-valor">17</div>
                            </div>
                            <div className="itens_ferramentas">
                                <div className="top-square"></div>
                                <div className="item-nome">Cards</div>
                                <div className="item-valor">6</div>
                            </div>
                            <div className="itens_ferramentas">
                                <div className="top-square"></div>
                                <div className="item-nome">Eventos</div>
                                <div className="item-valor">20</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
                    <FraseDoDia />
        </>
    )
}

export default Dashboard;