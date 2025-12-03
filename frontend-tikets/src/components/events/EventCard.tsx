import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import type { AppEvent } from '../../types';

interface EventCardProps {
  event: AppEvent;
  onClick?: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div 
      onClick={onClick}
      // CAMBIOS: bg-surface (blanco), shadow-soft (sombra), sin borde
      className="bg-surface rounded-3xl p-3 flex gap-4 mb-4 active:scale-[0.98] transition-transform cursor-pointer shadow-soft border border-transparent hover:border-border"
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className={`absolute top-1 left-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
          ${event.status === 'active' ? 'bg-white text-success' : 'bg-gray-200 text-secondary'}`}>
          {event.status === 'active' ? 'Activo' : 'Pasado'}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* text-textMain es negro ahora */}
        <h3 className="font-bold text-textMain text-lg leading-tight mb-1">{event.title}</h3>
        
        <div className="flex items-center text-secondary text-xs mb-1">
          <Calendar size={12} className="mr-1.5" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-secondary text-xs">
          <MapPin size={12} className="mr-1.5" />
          <span className="truncate max-w-[150px]">{event.location}</span>
        </div>
      </div>
    </div>
  );
}