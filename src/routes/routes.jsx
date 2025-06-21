import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PrivateRoute from './privateRoute';

import Carregando from '../Components/Carregando/carregando';

import Home from '../pages/Home/home';
import Cadastro from '../pages/CadastroPage/cadastro'
import Login from '../pages/LoginPage/login'

const Dashboard = lazy(() => import ('../pages/Dashboard/dashboard'));
const AccountLayout = lazy(() => import ('../layouts/AccountLayout'));
const Resumo = lazy(() => import ("../pages/Resumo/ResumoPage"));
const Agenda = lazy(() => import ("../pages/Agenda/AgendaPage"));
const Pomodoro = lazy(() => import ("../pages/Pomodoro/PomodoroPage"));
const Perfil = lazy(() => import ('../pages/PerfilPage/PerfilPage'));
const Flashcard = lazy(() => import ('../pages/Flashcard/flashcardPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<Carregando />}>
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
    </Suspense>
  )
}