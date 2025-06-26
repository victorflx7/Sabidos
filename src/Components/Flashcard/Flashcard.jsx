import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import { db } from '../../firebase/config';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const Flashcard = () => {
    const [cards, setCards] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [frente, setFrente] = useState("");
    const [verso, setVerso] = useState("");
    const [cardsVirados, setCardsVirados] = useState([]);
    const [activeCard, setActiveCard] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    useEffect(() => {
        if (!userId) return;

        const q = query(collection(db, "flashcards"), where("userId", "==", userId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedCards = [];
            querySnapshot.forEach((doc) => {
                loadedCards.push({ id: doc.id, ...doc.data() });
            });
            loadedCards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCards(loadedCards);
        });

        return () => unsubscribe();
    }, [userId]);

    const salvarFlashcard = async (e) => {
        e.preventDefault();
        if (!titulo.trim() || !frente.trim() || !verso.trim()) {
            alert("Preencha todos os campos!");
            return;
        }

        const dataFormatada = formatarData(new Date());

        try {
            await addDoc(collection(db, "flashcards"), {
                userId,
                titulo,
                frente,
                verso,
                data: dataFormatada,
                createdAt: new Date().toISOString()
            });
            setTitulo("");
            setFrente("");
            setVerso("");
        } catch (error) {
            console.error("Erro ao salvar Flashcard: ", error);
            alert("Erro ao salvar.");
        }
    };

    const deletarFlashcard = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Deseja realmente deletar?")) {
            try {
                await deleteDoc(doc(db, "flashcards", id));
            } catch (error) {
                console.error("Erro ao deletar:", error);
            }
        }
    };

    const virarCard = (index, e) => {
        e.stopPropagation();
        setCardsVirados(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const formatarData = (date) => {
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        return `${dia}/${mes < 10 ? '0' + mes : mes}`;
    };

    const handleViewCard = (card) => {
        setActiveCard(card);
    };

    const handleBackToList = () => {
        setActiveCard(null);
    };

    return (
        <div className="flashcard-container">
            {activeCard ? (
                <div className="active-card-view">
                    <button onClick={handleBackToList} className="back-button">← Voltar</button>
                    <div className="active-card-content">
                        <h3>{activeCard.titulo}</h3>
                        <div className="card-sides">
                            <div className="card-side">
                                <h4>Frente:</h4>
                                <p>{activeCard.frente}</p>
                            </div>
                            <div className="card-side">
                                <h4>Verso:</h4>
                                <p>{activeCard.verso}</p>
                            </div>
                        </div>
                        <small>Criado em: {activeCard.data}</small>
                    </div>
                </div>
            ) : (
                <div className='containerf'>
                    <div className="blocoesquerdoflashcard">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={`bloquinhoflashcard ${cardsVirados.includes(index) ? 'virado' : ''}`}
                                onClick={() => handleViewCard(card)}
                            >
                                <h5>{card.titulo}</h5>
                                <div className="card-content">
                                    {cardsVirados.includes(index) ? card.verso : card.frente}
                                </div>
                                <small>{card.data}</small>
                                <div className="card-actions">
                                    <button className='btn-flip' onClick={(e) => virarCard(index, e)}>🔄</button>
                                    <button className='btn_del' onClick={(e) => deletarFlashcard(card.id, e)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='blocodireitoflashcard'>
                        <form onSubmit={salvarFlashcard}>
                            <textarea
                                type="text"
                                className='inputTitulo'
                                placeholder='Título'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                maxLength={50}
                            />
                            <textarea
                                className='inputDesc'
                                placeholder='Conteúdo da Frente'
                                value={frente}
                                onChange={(e) => setFrente(e.target.value)}
                                rows={5}
                            />
                            <textarea
                                className='inputDesc'
                                placeholder='Conteúdo do Verso'
                                value={verso}
                                onChange={(e) => setVerso(e.target.value)}
                                rows={5}
                            />
                            <button type="submit" className='botao1'>+</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Flashcard;
