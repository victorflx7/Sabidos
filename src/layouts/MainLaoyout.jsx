// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import './MainLayout.css'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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