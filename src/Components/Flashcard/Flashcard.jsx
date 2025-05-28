import React, { useState } from 'react'
import './Flashcard.css'
import { db, collection, addDoc, query, onSnapshot  } from '../../firebase/config';
import { getAuth } from "firebase/auth";
import {  where } from "firebase/firestore";

const Flashcard = () => {
    const [cards, setResumos] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [frente, setFrente] = useState("");
    const [verso, setVerso] = useState("");
    const [cardsVirados, setCardsVirados] = useState([]);
      const auth = getAuth();
        const user = auth.currentUser;
        const userId = user?.uid;
    
    
    const salvarFlashcard = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        
        if (titulo.trim() === "" && frente.trim() === "" && verso.trim() === "") {
            window.alert("Sem título, nem descrição? Aí você me quebra, sabido!")
            return;
        }

        if (titulo.trim() === "") {
            window.alert("Parece que você esqueceu de inserir um título!")
            return;
        };

        if (frente.trim() === "") {
            window.alert("Parece que você esqueceu de inserir uma descrição!")
            return;
        };
        if (verso.trim() === "") {
            window.alert("Parece que você esqueceu de inserir uma descrição!")
            return;
        };


        const agora = new Date();
        const dia = agora.getDate();
        const mes = agora.getMonth() + 1;
        let dataForm = ""
        if (mes < 10) {
            dataForm = `${dia}/0${mes}`;
        }
        else {
            dataForm = `${dia}/${mes}`;
        }
        const novoResumo = {
            titulo,
            frente,
            verso,
            data: dataForm,
        };
        setResumos([...cards, novoResumo]);
        setTitulo("");
        setFrente("");
        setVerso("");

        
            try {
                await addDoc(collection(db, "flashcards"), {
                    userId : userId,
                    titulo: titulo,
                    frente: frente,
                    verso: verso,
                    createdAt: new Date().toISOString()

                });
                console.log("Flashcard salvo com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar evento: ", error);
            }
        




    }
    const delResumo = (indexDel) => {
        const resumosUpd = cards.filter((resumo, index) => index !== indexDel)
        setResumos(resumosUpd)
    }
    const virarCard = (indexVirar) => {
        if (cardsVirados.includes(indexVirar)) {
            setCardsVirados(cardsVirados.filter(i => i !== indexVirar)); // desvira
        } else {
            setCardsVirados([...cardsVirados, indexVirar]); // vira
        }


    };

    return (
        <>
            <div>

                <div className='container'>
                    <div className="blocoesquerdo">
                        {cards.map((card, index) => (
                            <div className="bloquinho2" key={index}>
                                <h5>{card.titulo}</h5>
                                <br />
                                <p>{cardsVirados.includes(index) ? card.verso : card.frente}</p>
                                <p>{card.data}</p>
                                <button className='btn_del' onClick={() => delResumo(index)}>X</button>
                                <button onClick={() => virarCard(index)}>
                                    {cardsVirados.includes(index) ? 'Mostrar Frente' : 'Mostrar Verso'}
                                </button>
                            </div>
                        ))}

                    </div>
                    <div className='blocodireito'>
                        <textarea type="text" className='inputTitulo' placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        <textarea type="text" className='inputDesc' style={{}} placeholder='Frente' value={frente} onChange={(e) => setFrente(e.target.value)} />
                        <textarea type="text" className='inputDesc' placeholder='Verso' value={verso} onChange={(e) => setVerso(e.target.value)} />
                        <button className='botao1' onClick={salvarFlashcard(e)}>
                            <img src="485.svg" className='imagem1' />
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Flashcard