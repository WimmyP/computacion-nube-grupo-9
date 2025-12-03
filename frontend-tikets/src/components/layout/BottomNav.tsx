import React from 'react';
import { Home, Search, Ticket, Heart, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Definimos las rutas y sus iconos
  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Search, label: 'Explorar', path: '/explore' },
    { icon: Ticket, label: 'Tickets', path: '/tickets' },
    { icon: Heart, label: 'Favoritos', path: '/favorites' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-100 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center w-12 h-12 gap-1 transition-all active:scale-90"
            >
              {/* Icono: Azul si está activo, Gris si no */}
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`} 
              />
              {/* Punto indicador (opcional, estilo minimalista) */}
              {isActive && (
                <span className="w-1 h-1 bg-primary rounded-full absolute bottom-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}