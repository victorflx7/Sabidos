import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from '../../firebase/config';
import './DashboardProgresso.css'

const DashboardProgresso = () => {
    const [progresso, setProgresso] = useState({
        resumos: 0,
        flashcards: 0,
        pomodoros: 0,
        metaResumos: 10,
        metaFlashcards: 10,
        metaPomodoros: 20
    });
    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'usuarios', auth.currentUser.uid),
            (doc) => {
                if (doc.exists()) {
                    setProgresso({
                        resumos: doc.data().QuantResumos || 0,
                        flashcards: doc.data().QuantFlashcard || 0,
                        pomodoros: doc.data().QuantPomo || 0,
                        ...progresso
                    });
                }
            }
        );
        return () => unsubscribe();
    }, []);
    
    const calcularPorcentagem = (atual, meta) => Math.min((atual / meta) * 100, 100);
    return (
        <div className="dashboard-progresso">
            <h2>Seu Progresso</h2>
            {['resumos', 'flashcards', 'pomodoros'].map((item) => (
                <div key={item} className="progresso-item">
                    <h3>
                        {item === 'resumos' && 'Resumos criados'}
                        {item === 'flashcards' && 'Flashcards Estudados'}
                        {item === 'pomodoros' && 'Sessões Pomodoro'}
                    </h3>
                    <div className="progresso-barra">
                        <div className="progresso-preenchimento" style={{
                            width: `${calcularPorcentagem(
                                progresso[item],
                                progresso[`meta${item.charAt(0).toUpperCase() + item.slice(1)}`]
                            )}%`
                        }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default DashboardProgresso;