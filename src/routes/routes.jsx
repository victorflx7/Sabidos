// src/routes/routes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/home'
import Cadastro from '../pages/CadastroPage/cadastro'
import Login from '../pages/LoginPage/login';
import Dashboard from '../pages/Dashboard/dashboard';
import AccountLayout from '../layouts/AccountLayout';
import MainLayout from '../layouts/MainLaoyout';
export function AppRoutes() {
  return (
     <Routes>

       <Route path="/" element={<Home />} />
    
     <Route element={<AccountLayout />}>
       <Route path="/cadastro" element={<Cadastro />} />
     <Route path="/login" element={<Login />} />
     </Route>

     <Route element={<MainLayout />}>
       <Route path="/dashboard" element={<Dashboard />} />
    {/* <Route path="/Resumo" element={<Resumo />} /> */}
     </Route>
     

     
   </Routes>
  )
}