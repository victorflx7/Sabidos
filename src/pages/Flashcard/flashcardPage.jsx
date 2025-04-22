import React from 'react'

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Flashcard from '../../Components/Flashcard/Flashcard';


const flashcardPage = () => {
  return (
    <>
    <Header title='Flashcards'/>
    <Flashcard/>
    <Footer/>
    </>
  )
}

export default flashcardPage
