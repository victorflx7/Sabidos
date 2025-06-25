// src/routes/routes.jsx

import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute';
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


      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/Resumo" element={<PrivateRoute><Resumo /></PrivateRoute>} />
      <Route path="/Agenda" element={<PrivateRoute><Agenda /></PrivateRoute>} />
      <Route path="/Pomodoro" element={<PrivateRoute><Pomodoro /></PrivateRoute>} />
      <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="/Flashcard" element={<PrivateRoute><Flashcard /></PrivateRoute>} />



    </Routes>
  )
}