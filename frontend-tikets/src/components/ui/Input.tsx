import React from 'react';
// EL FIX: Agregamos 'type' para que Vite sepa que esto no es código JS
import type { LucideIcon } from 'lucide-react'; 

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon; // Usamos el tipo aquí
}

export default function Input({ icon: Icon, label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm text-secondary font-semibold ml-1">{label}</label>}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon size={20} />
          </div>
        )}
        
        <input 
          className={`
            w-full 
            bg-gray-50 
            text-textMain 
            rounded-2xl 
            border border-gray-200 
            focus:bg-white
            focus:border-primary 
            focus:ring-4 focus:ring-primary/10 
            outline-none 
            py-4 
            ${Icon ? 'pl-12' : 'pl-4'} 
            pr-4 
            placeholder:text-gray-400 
            transition-all 
            font-medium
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
}