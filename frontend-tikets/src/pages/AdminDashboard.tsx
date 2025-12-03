import React from 'react';
import { 
  QrCode, 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  ChevronRight, 
  DollarSign, 
  MapPin, 
  MoreVertical,
  Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AppEvent } from '../types';

// --- MOCK DATA (Datos simulados del Local) ---
const stats = {
  revenue: "12,450",
  ticketsSold: 843,
  checkedIn: 120,
  totalCapacity: 1000
};

const myEvents: AppEvent[] = [
  { 
    id: '1', 
    title: 'Piazzolla Event', 
    date: 'Hoy • 8:00 PM', 
    location: 'Teatro Gran Mariscal', 
    image: 'https://images.unsplash.com/photo-1514306191717-452245255e0c?w=100', 
    status: 'active',
    price: 70
  },
  { 
    id: '2', 
    title: 'Jazz Night', 
    date: 'Vie 18 • 9:00 PM', 
    location: 'Café Berlín', 
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100', 
    status: 'active',
    price: 50
  },
];

// --- COMPONENTES UI ---

// Tarjeta de Estadística Minimalista
const StatCard = ({ label, value, icon: Icon, subValue, highlight = false }: any) => (
  <div className={`p-4 rounded-2xl border ${highlight ? 'bg-primary text-white border-primary shadow-lg shadow-blue-200' : 'bg-white border-gray-100 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-xl ${highlight ? 'bg-white/20' : 'bg-gray-50 text-gray-600'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      {subValue && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${highlight ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
          {subValue}
        </span>
      )}
    </div>
    <div className="mt-2">
        <h3 className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
        <p className={`text-xs font-medium ${highlight ? 'text-blue-100' : 'text-gray-400'}`}>{label}</p>
    </div>
  </div>
);

// Fila de Evento (Gestión)
const EventRow = ({ event }: { event: AppEvent }) => (
  <div className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 transition-all cursor-pointer mb-3">
    {/* Imagen Pequeña */}
    <div className="w-14 h-14 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
      <img src={event.image} alt="" className="w-full h-full object-cover" />
    </div>
    
    {/* Info */}
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-gray-900 text-sm truncate">{event.title}</h4>
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
        <Calendar size={12} />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-0.5">
        <Ticket size={12} />
        <span>85% Vendido</span>
      </div>
    </div>

    {/* Botón Acción */}
    <button className="p-2 text-gray-400 hover:text-black transition-colors">
      <MoreVertical size={20} />
    </button>
  </div>
);

// --- PÁGINA PRINCIPAL ---

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-gray-900">
      
      {/* 1. Header Sticky */}
      <div className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-gray-100 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-black text-black tracking-tight">Panel Local</h1>
          <p className="text-xs text-gray-500 font-medium">Teatro Gran Mariscal</p>
        </div>
        <div className="w-9 h-9 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <img src="https://ui-avatars.com/api/?name=Teatro+M&background=random" alt="Local" />
        </div>
      </div>

      {/* 2. Acción Principal: Escáner QR */}
      <div className="px-5 mt-6 mb-6">
        <button className="w-full bg-black text-white p-4 rounded-2xl shadow-lg shadow-gray-300 active:scale-95 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-xl">
                    <QrCode size={24} />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-lg leading-tight">Escanear Entradas</h3>
                    <p className="text-gray-400 text-xs">Validar tickets en puerta</p>
                </div>
            </div>
            <div className="bg-white text-black rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight size={20} />
            </div>
        </button>
      </div>

      {/* 3. Grid de Estadísticas */}
      <div className="px-5 mb-8">
        <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Resumen
        </h2>
        <div className="grid grid-cols-2 gap-3">
            {/* Ingresos (Destacado) */}
            <StatCard 
                label="Ingresos Totales" 
                value={`Bs ${stats.revenue}`} 
                icon={DollarSign} 
                highlight={true}
                subValue="+12%"
            />
            {/* Tickets Vendidos */}
            <StatCard 
                label="Tickets Vendidos" 
                value={stats.ticketsSold} 
                icon={Ticket} 
                subValue="+5 hoy"
            />
            {/* Aforo Actual */}
            <StatCard 
                label="En el evento" 
                value={`${stats.checkedIn} / ${stats.totalCapacity}`} 
                icon={Users} 
            />
             {/* Próximos */}
             <StatCard 
                label="Eventos Activos" 
                value="3" 
                icon={Calendar} 
            />
        </div>
      </div>

      {/* 4. Gestión de Eventos */}
      <div className="px-5 mb-20">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">Mis Eventos</h2>
            <button className="text-primary text-sm font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                <Plus size={16} /> Nuevo
            </button>
        </div>

        <div className="space-y-1">
            {myEvents.map(event => (
                <EventRow key={event.id} event={event} />
            ))}
        </div>
      </div>

    </div>
  );
}