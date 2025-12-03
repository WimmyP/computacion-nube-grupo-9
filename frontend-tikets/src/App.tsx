import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Importación de páginas
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard'; // <--- Aquí importamos tu nuevo panel
import Explore from './pages/Explore';
import MyTickets from './pages/MyTickets';
// Componentes de Layout
import BottomNav from './components/layout/BottomNav';

// Componente Wrapper para controlar dónde sale la barra de navegación
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Lista negra: Rutas donde NO queremos ver la barra de navegación inferior
  const hideNavRoutes = ['/login', '/admin'];
  
  // Si la ruta actual empieza con /admin, también ocultamos (por si tienes sub-rutas tipo /admin/eventos)
  const shouldHideNav = hideNavRoutes.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background font-sans text-textMain">
      {children}
      {/* Solo mostramos la barra si NO estamos en la lista negra */}
      {!shouldHideNav && <BottomNav />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta por defecto: Redirigir a /login o /home según prefieras. 
              Por ahora lo dejamos en Home */}
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Ruta del Panel Administrador */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Ruta para el detalle del evento (Placeholder por ahora) */}
          <Route path="/event/:id" element={<div className="p-10 text-center">Detalle del Evento (Próximamente)</div>} />

          {/* Rutas pendientes (para que no den error 404 si haces clic en el menú) */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/favorites" element={<div className="p-10">Favoritos</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;