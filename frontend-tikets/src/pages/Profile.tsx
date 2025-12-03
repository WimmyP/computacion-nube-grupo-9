import React from 'react';
import { 
  User as UserIcon, Ticket, Users, Briefcase, FileText, Settings, HelpCircle, LogOut, ChevronRight 
} from 'lucide-react';
import type { User } from '../types';

// Mock Data
const user: User = {
  id: '1',
  name: 'Emily Peñaranda',
  email: 'emilypenaranda@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  stats: { events: 0, followers: 5, following: 0 }
};

// Componente simplificado (ya usa los colores globales)
const MenuItem = ({ icon: Icon, label, onClick, isDestructive = false }: any) => (
  <button 
    onClick={onClick}
    className="w-full bg-surface p-4 rounded-3xl flex items-center justify-between mb-4 shadow-soft active:scale-[0.99] transition-all border border-transparent hover:border-gray-100"
  >
    <div className="flex items-center gap-4">
      <div className={`${isDestructive ? 'text-danger' : 'text-textMain'}`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      <span className={`font-semibold text-[15px] ${isDestructive ? 'text-danger' : 'text-textMain'}`}>
        {label}
      </span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </button>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-textMain font-bold text-base mb-4 ml-1 mt-8">
    {title}
  </h3>
);

export default function Profile() {
    
  return (
    // Ya no necesitamos clases bg-... hardcodeadas aquí
    <div className="min-h-screen p-6 pb-24">
      
      <div className="flex flex-col items-start gap-4 mb-2 pt-8">
        <div className="flex items-center gap-5 w-full">
            <div className="w-24 h-24 rounded-full border border-gray-200 p-1 bg-white shadow-sm">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
            </div>
            
            <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-textMain tracking-tight mb-1">{user.name}</h1>
                <p className="text-secondary text-sm mb-3 font-medium">{user.email}</p>
                
                <div className="flex gap-6 text-sm">
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-textMain">{user.stats.following}</span>
                        <span className="text-gray-400 text-xs mt-0.5">Siguiendo</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-textMain">{user.stats.followers}</span>
                        <span className="text-gray-400 text-xs mt-0.5">Seguidores</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div>
        <SectionTitle title="Personal" />
        <MenuItem icon={UserIcon} label="Editar Perfil" />
        <MenuItem icon={Ticket} label="Tickets" />
        <MenuItem icon={Users} label="Amigos" />
      </div>

      <div>
        <SectionTitle title="Organización" />
        <MenuItem icon={Briefcase} label="Mis eventos" />
        <MenuItem icon={FileText} label="Contratos" />
      </div>

      <div>
        <SectionTitle title="Ayuda" />
        <MenuItem icon={Settings} label="Preferencias" />
        <MenuItem icon={HelpCircle} label="Ayuda" />
      </div>

      <div className="mt-8 mb-8">
        <MenuItem icon={LogOut} label="Cerrar Sesion" isDestructive={true} />
      </div>

    </div>
  );
}