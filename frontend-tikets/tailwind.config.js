/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TEMA CLARO (LIGHT MODE)
        background: '#FAFAFA', // Gris muy suave para el fondo general (App background)
        surface: '#FFFFFF',    // Blanco puro para tarjetas y bloques
        primary: '#2F80ED',    // Azul (se mantiene igual)
        secondary: '#828282',  // Gris para textos secundarios
        textMain: '#1A1A1A',   // Casi negro para títulos
        border: '#E5E7EB',     // Gris suave para bordes
        success: '#27AE60',
        danger: '#EB5757',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}