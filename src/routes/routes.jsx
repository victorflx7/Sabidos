// src/routes/routes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/home'
import Cadastro from '../pages/CadastroPage/cadastro'
import Login from '../pages/LoginPage/login';
import Dashboard from '../pages/Dashboard/dashboard';
import AccountLayout from '../layouts/AccountLayout';
import Resumo from "../pages/Resumo/ResumoPage"
import Agenda from "../pages/Agenda/AgendaPage"
import Pomodoro from "../pages/Pomodoro/PomodoroPage"
import Perfil from '../pages/PerfilPage/PerfilPage';
import Flashcard from '../pages/Flashcard/flashcardPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />

      <Route element={<AccountLayout />}>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Route>


      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Resumo" element={<Resumo />} />
      <Route path="/Agenda" element={<Agenda />} />
      <Route path="/Pomodoro" element={<Pomodoro />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/Flashcard" element={<Flashcard />} />



    </Routes>
  )
}