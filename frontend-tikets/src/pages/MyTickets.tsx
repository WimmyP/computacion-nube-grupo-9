import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- TIPOS Y MOCK DATA ---

type TicketStatus = 'active' | 'attended' | 'cancelled';

interface Ticket {
  id: string;
  eventName: string;
  ticketType: string;
  date: string;
  time: string;
  quantity: number;
  price: number;
  image: string;
  status: TicketStatus;
}

const myTickets: Ticket[] = [
  {
    id: '1',
    eventName: 'Zona General',
    ticketType: 'Zona General',
    date: 'mar 27 de jul',
    time: '10:00 pm',
    quantity: 1,
    price: 15,
    image: 'https://images.unsplash.com/photo-1514306191717-452245255e0c?w=150',
    status: 'attended'
  },
  {
    id: '2',
    eventName: 'Zona General',
    ticketType: 'Zona General',
    date: 'mar 27 de jul',
    time: '10:00 pm',
    quantity: 1,
    price: 15,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=150',
    status: 'cancelled'
  },
  {
    id: '3',
    eventName: 'Zona General',
    ticketType: 'Zona General',
    date: 'mar 27 de jul',
    time: '10:00 pm',
    quantity: 1,
    price: 15,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150',
    status: 'attended'
  },
    {
    id: '4',
    eventName: 'Zona General',
    ticketType: 'Zona General',
    date: 'mar 27 de jul',
    time: '10:00 pm',
    quantity: 1,
    price: 15,
    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97d848?w=150',
    status: 'attended'
  }
];

// --- COMPONENTES UI ---

const FilterButton = ({ label, active = false, hasDropdown = false }: { label: string, active?: boolean, hasDropdown?: boolean }) => (
  <button className={`
    px-4 py-2 rounded-xl text-sm font-medium border transition-all flex items-center gap-1
    ${active 
      ? 'bg-black text-white border-black' 
      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}
  `}>
    {label}
    {hasDropdown && <ChevronDown size={14} />}
  </button>
);

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  // Lógica de colores según estado
  const statusConfig = {
    active: { color: 'text-primary', label: 'Activo' },
    attended: { color: 'text-green-500', label: 'Asistido' },
    cancelled: { color: 'text-red-500', label: 'Cancelado' }
  };

  const statusInfo = statusConfig[ticket.status];

  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl mb-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
      {/* Imagen Cuadrada con borde suave */}
      <div className="w-16 h-16 rounded-xl bg-gray-100 p-1 flex-shrink-0 border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
         <img src={ticket.image} alt="" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Información Central */}
      <div className="flex-1 min-w-0">
        {/* Fila Superior: Estado + Fecha */}
        <div className="flex items-center gap-1 text-[10px] mb-0.5">
            <span className={`font-bold ${statusInfo.color}`}>{statusInfo.label}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 font-medium">{ticket.date} • {ticket.time}</span>
        </div>
        
        {/* Título Principal */}
        <h3 className="font-bold text-gray-900 text-base leading-tight">{ticket.eventName}</h3>
        
        {/* Cantidad de Tickets */}
        <p className="text-xs text-gray-500 mt-0.5">{ticket.quantity} Ticket</p>
      </div>

      {/* Precio (Derecha) */}
      <div className="text-right">
        <span className="font-bold text-gray-900 text-lg">${ticket.price}</span>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export default function MyTickets() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      
      {/* 1. Header Centrado */}
      <div className="pt-8 pb-4 flex justify-center items-center bg-white sticky top-0 z-10">
        <h1 className="text-lg font-black tracking-tight text-black">Mis Tickets</h1>
      </div>

      {/* 2. Barra de Filtros */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
            <button className="p-2 rounded-xl border border-gray-200 text-black hover:bg-gray-50">
                <SlidersHorizontal size={18} />
            </button>
            <FilterButton label="Asistidos" />
            <FilterButton label="Cancelado" />
            <FilterButton label="Periodo" hasDropdown />
        </div>
      </div>

      {/* 3. Lista de Tickets */}
      <div className="px-5">
        {myTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

    </div>
  );
}