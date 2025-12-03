import React from 'react';
import { 
  PlusSquare, 
  Users, 
  MessageCircle, 
  Search, 
  SlidersHorizontal, 
  ArrowRight,
  Music,
  MapPin,
  Calendar,
  DollarSign,
  Ticket,
  Heart,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTES UI ESPECÍFICOS PARA ESTA PANTALLA ---

// 1. Tarjeta Destacada ("Esta Semana") - Diseño exacto de la imagen
const FeaturedCard = ({ event, onClick }: any) => (
  <div onClick={onClick} className="bg-white mb-6 group cursor-pointer active:scale-[0.99] transition-transform">
    {/* Imagen Grande Gris */}
    <div className="w-full aspect-video bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        <Music size={40} />
      </div>
    </div>

    <div className="flex justify-between items-end">
      {/* Información Izquierda */}
      <div className="space-y-2 flex-1">
        <h3 className="font-extrabold text-lg text-black flex items-center gap-2">
          <Music size={18} strokeWidth={3} />
          {event.title}
        </h3>
        
        {/* Lista de detalles vertical (como en la imagen) */}
        <div className="space-y-1.5">
            <div className="flex items-start gap-3 text-xs">
                <MapPin size={16} className="text-black mt-0.5 shrink-0" />
                <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">{event.city}</span>
                    <span className="text-gray-500">{event.venue}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500">
                <Calendar size={16} className="text-black shrink-0" />
                <div className="flex gap-1">
                    <span className="capitalize text-gray-900">{event.day}</span>
                    <span>{event.time}</span>
                    <span>{event.date}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
                <DollarSign size={16} className="text-black shrink-0" />
                <span className="text-gray-900 font-medium">Desde {event.price} Bs</span>
            </div>
        </div>
      </div>

      {/* Acciones Derecha (Iconos alineados abajo a la derecha) */}
      <div className="flex gap-4 pb-1 text-gray-400">
        <button className="hover:text-primary transition-colors"><Ticket size={24} strokeWidth={1.5} /></button>
        <button className="hover:text-red-500 transition-colors"><Heart size={24} strokeWidth={1.5} /></button>
        <button className="hover:text-primary transition-colors"><Share2 size={24} strokeWidth={1.5} /></button>
      </div>
    </div>
  </div>
);

// 2. Tarjeta Vertical ("Cerca de Ti")
const NearbyCard = ({ event }: any) => (
  <div className="min-w-[160px] w-[160px] flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
    {/* Imagen Cuadrada */}
    <div className="w-full aspect-square bg-gray-200 rounded-xl mb-3 relative overflow-hidden">
        {/* Badge "Pocos Tickets" */}
        {event.tag && (
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                {event.tag}
            </div>
        )}
        <button className="absolute top-2 left-2 text-gray-500 hover:text-red-500 z-10 bg-white/50 p-1 rounded-full backdrop-blur-sm">
            <Heart size={16} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <Music size={24} />
        </div>
    </div>

    {/* Info Compacta */}
    <div className="space-y-1">
      <h3 className="font-bold text-sm text-black flex items-center gap-1 truncate">
        <Music size={12} strokeWidth={3} />
        {event.title}
      </h3>
      
      <div className="flex flex-col text-[10px] text-gray-500 leading-tight space-y-1">
        <div className="flex items-center gap-1">
            <MapPin size={10} className="text-black" />
            <span className="font-medium text-gray-700 truncate">{event.city}</span>
            <span className="truncate">{event.venue}</span>
        </div>
        <div className="flex items-center gap-1">
            <Calendar size={10} className="text-black" />
            <span>{event.day} {event.time}</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-black mt-0.5">
            <DollarSign size={10} className="text-black" />
            <span>Desde {event.price} Bs</span>
        </div>
      </div>
    </div>
  </div>
);


// --- DATOS MOCK ---
const featuredEvent = {
  id: 1,
  title: "Piazzolla Event",
  city: "Sucre",
  venue: "Teatro Gran Mariscal",
  day: "Lunes",
  time: "8:00 PM",
  date: "Agosto, 15",
  price: 70
};

const nearbyEvents = [
  { id: 1, title: "Piazzolla Event", city: "Sucre", venue: "Teatro G. Mariscal", day: "Lun", time: "8:00 PM", price: 70, tag: "Pocos Tickets" },
  { id: 2, title: "Vivaldi en las Nubes", city: "Sucre", venue: "Teatro G. Mariscal", day: "Lun", time: "8:00 PM", price: 70 },
  { id: 3, title: "Jazz Night", city: "Sucre", venue: "Café Berlín", day: "Mar", time: "9:00 PM", price: 50 }
];

// --- PÁGINA PRINCIPAL ---

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24 font-sans text-gray-900">
      
      {/* 1. Header Sticky (Logo + Iconos) - SIN TABS */}
      <div className="px-5 pt-6 pb-4 flex justify-between items-center bg-white sticky top-0 z-30 shadow-sm border-b border-gray-50">
        <h1 className="text-2xl font-black tracking-tight text-black">ConTart</h1>
        <div className="flex gap-5 text-black">
          <button className="hover:opacity-70"><PlusSquare size={24} strokeWidth={1.5} /></button>
          <button className="hover:opacity-70"><Users size={24} strokeWidth={1.5} /></button>
          <button className="hover:opacity-70"><MessageCircle size={24} strokeWidth={1.5} /></button>
        </div>
      </div>

      {/* 2. Buscador (Con margen superior para separarlo del header) */}
      <div className="px-5 mt-6 mb-8">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Encuentra" 
            className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary transition-colors" size={18} />
        </div>
      </div>

      {/* 3. Sección: Esta Semana */}
      <div className="px-5 mb-10">
        <div className="flex justify-between items-center mb-4 group cursor-pointer">
          <h2 className="text-lg font-bold text-black group-hover:text-primary transition-colors">Esta Semana</h2>
          <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
        </div>
        
        {/* Al hacer clic, vamos al detalle del evento */}
        <FeaturedCard 
            event={featuredEvent} 
            onClick={() => navigate('/event/1')} 
        />
      </div>

      {/* 4. Sección: Cerca de Ti (Carrusel) */}
      <div className="pl-5 mb-10">
        <div className="flex justify-between items-center mb-4 pr-5 group cursor-pointer">
          <h2 className="text-lg font-bold text-black group-hover:text-primary transition-colors">Cerca de Ti</h2>
          <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pr-5">
          {nearbyEvents.map((event, i) => (
             <NearbyCard key={i} event={event} />
          ))}
        </div>
      </div>

       {/* 5. Sección: Fiestas */}
       <div className="pl-5 mb-8">
        <div className="flex justify-between items-center mb-4 pr-5 group cursor-pointer">
          <h2 className="text-lg font-bold text-black group-hover:text-primary transition-colors">Fiestas</h2>
          <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pr-5">
          {nearbyEvents.map((event, i) => (
             <NearbyCard key={i} event={event} />
          ))}
        </div>
      </div>

    </div>
  );
}