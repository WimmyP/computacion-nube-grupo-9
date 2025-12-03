import React, { useState, useEffect } from 'react';
import { PlusSquare, Users, MessageCircle, Search, SlidersHorizontal } from 'lucide-react';
import api from '../lib/api';
import type { AppEvent } from '../types';
import EventCard from '../components/events/EventCard';

export default function Explore() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        // Add a placeholder image for each event
        const eventsWithImages = response.data.map((event: any) => ({
          ...event,
          image: `https://picsum.photos/seed/${event.id}/200`,
        }));
        setEvents(eventsWithImages);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      
      {/* 1. Header */}
      <div className="px-5 pt-6 pb-2 flex justify-between items-center bg-white sticky top-0 z-30">
        <h1 className="text-xl font-black tracking-tight text-black">ConTart</h1>
        <div className="flex gap-4 text-black">
          <button className="hover:opacity-70"><PlusSquare size={24} strokeWidth={1.5} /></button>
          <button className="hover:opacity-70"><Users size={24} strokeWidth={1.5} /></button>
          <button className="hover:opacity-70"><MessageCircle size={24} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* 2. Barra de Búsqueda */}
      <div className="px-5 mt-4 mb-8">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Encuentra eventos..." 
            className="w-full bg-white border border-gray-200 rounded-full py-3 pl-10 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary" size={18} />
        </div>
      </div>

      {/* 3. Lista de Eventos */}
      <div className="px-5">
        <h2 className="text-lg font-bold mb-4">Eventos Populares</h2>
        {events.length > 0 ? (
          events.map(event => <EventCard key={event.id} event={event} />)
        ) : (
          <p>Cargando eventos...</p>
        )}
      </div>

    </div>
  );
}