import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "w-full py-3.5 px-6 rounded-2xl font-semibold transition-all duration-200 active:scale-95 flex justify-center items-center gap-2 text-sm";
  
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-blue-600 border border-transparent",
    // Cambio clave: Borde gris y texto oscuro para outline
    outline: "border border-gray-200 text-textMain bg-white hover:bg-gray-50",
    ghost: "text-secondary hover:text-textMain bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}