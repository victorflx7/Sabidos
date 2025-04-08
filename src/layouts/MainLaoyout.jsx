// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import './MainLayout.css'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

export default function MainLayout() {
  return (
    <div className="main-layout">
      
      <Header/>
      
      {/* Conteúdo dinâmico das rotas */}
      <main className="main-content-area">
        <Outlet /> {/* Aqui as páginas serão injetadas */}
      </main>
      
     
      <Footer />
    </div>
  );
}