import React from 'react'
import './SobreNos.css'

const SobreNos = () => {
    return (
        <div className='container-snos'>
            <h1 className='titulo-snos'>SabidoS²</h1>
            <p className='descricao-snos'>
                O SabidoS² é um website interativo que oferece métodos e anotações de estudo gratuitas para alunos do ensino médio e universitário. Nosso objetivo é reunir diversas ferramentas acadêmicas em um único ambiente digital, promovendo uma experiência de aprendizado mais eficiente, organizada e acessível para todos.
            </p>

            <div className='container-bloco-snos'>
                <div className='bloco-snos'>
                    <img className='avatar-snos' src='avatarMatos.svg' alt='' />
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Opa, sou o <span className='span-snos'>Victor Matos!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                </div>
                <div className='bloco-snos'>
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Eae, sou o <span className='span-snos'>Luiz!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                    <img className='avatar-snos' src='avatarLuiz.svg' alt='' />
                </div>
                <div className='bloco-snos'>
                    <img className='avatar-snos' src='avatarWill.svg' alt='' />
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Ola meu povo, eu sou o <span className='span-snos'>William!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                </div>
                <div className='bloco-snos'>
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Salve, eu sou o <span className='span-snos'>Victor Freitas!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                    <img className='avatar-snos' src='avatarVitas.svg' alt='' />
                </div>
            </div>
        </div>
    )
}

export default SobreNos