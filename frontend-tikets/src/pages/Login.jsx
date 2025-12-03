import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col justify-end pb-10 sm:justify-center font-sans">
      
      {/* 1. FONDO INMERSIVO (Concierto/Evento) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Capa oscura (Overlay) para que se lea el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

      {/* 2. CONTENIDO (Flotando sobre el fondo) */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        
        {/* Branding Renovado */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-white shadow-2xl">
            {/* Aquí iría tu logo real, por ahora un texto estilizado */}
            <span className="font-black text-3xl tracking-tighter">Ct</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Descubre <br/> <span className="text-primary">Tu Ciudad</span>
          </h1>
          <p className="text-gray-300 text-lg">Los mejores eventos de Sucre en un solo lugar.</p>
        </div>

        {/* Formulario Estilo "Glassmorphism" */}
        <div className="flex flex-col gap-5 bg-white/5 p-2 rounded-3xl backdrop-blur-sm border border-white/10">
          
          {/* Inputs adaptados a fondo oscuro */}
          <div className="bg-white rounded-2xl p-1">
             <Input 
                icon={Mail} 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-transparent border-none focus:ring-0 text-black placeholder:text-gray-400"
              />
          </div>
          
          <div className="bg-white rounded-2xl p-1">
            <Input 
                icon={Lock} 
                type="password" 
                placeholder="Contraseña" 
                className="bg-transparent border-none focus:ring-0 text-black placeholder:text-gray-400"
              />
          </div>

          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            className="rounded-xl py-4 shadow-[0_0_20px_rgba(47,128,237,0.5)]" // Glow effect en el botón
          >
            Iniciar Sesión <ArrowRight size={20} />
          </Button>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
            <button className="text-sm text-gray-400 font-medium hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
            </button>
            
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="bg-black/50 px-2 text-gray-500 rounded">O</span>
                </div>
            </div>

            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                G Continuar con Google
            </Button>
            
            <p className="text-gray-400 text-sm mt-4">
                ¿Nuevo aquí? <span className="text-white font-bold underline cursor-pointer">Crear cuenta</span>
            </p>
        </div>

      </div>
    </div>
  );
}