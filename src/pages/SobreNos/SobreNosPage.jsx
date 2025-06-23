import React from 'react'
import './SobreNosPage.css'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import SobreNos from '../../Components/SobreNos/SobreNos'

const SobreNosPage = () => {
    return (
        <>
            <Header title='SobreNos' />
            <SobreNos></SobreNos>
            <Footer></Footer>
        </>
    )
}

export default SobreNosPage