import React from 'react'
import './SobreNos.css'
import Sobre from '../../data/ContatoSabidos.json'

const SobreNos = () => {
    return (
        <div className='container-snos'>
            <h1 className='titulo-snos'>SabidoS²</h1>
            <p className='descricao-snos'>
                {Sobre.objetivo}
            </p>

            <div className='container-bloco-snos'>
                <div className='bloco-snos'>
                    <img className='avatar-snos' src='avatarMatos.svg' alt='Imagem-Membro-Matos' />
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Opa, sou o <span className='span-snos'>Victor Matos!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                </div>
                <div className='bloco-snos'>
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Eae, sou o <span className='span-snos'>Luiz!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                    <img className='avatar-snos' src='avatarLuiz.svg' alt='Imagem-Membro-Luiz' />
                </div>
                <div className='bloco-snos'>
                    <img className='avatar-snos' src='avatarWill.svg' alt='Imagem-Membro-Willian' />
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Ola meu povo, eu sou o <span className='span-snos'>Willian!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                </div>
                <div className='bloco-snos'>
                    <div className='caixa-snos'>
                        <p className='txt-snos'>Salve, eu sou o <span className='span-snos'>Victor Freitas!</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos ab omnis.</p>
                    </div>
                    <img className='avatar-snos' src='avatarVitas.svg' alt='Imagem-Membro-Vitamina' />
                </div>
                <div className="bloco-contato">
                    <p className="texto-contato">
                        {Sobre.contate}
                    </p>
                    <div><img className="icone-contato" src={Sobre.sabidosvg} alt='Icone-SabidoS²-Outline' /></div>

                    <a href={`mailto:${Sobre.email}`} className="email-contato">
                        {Sobre.email}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SobreNos