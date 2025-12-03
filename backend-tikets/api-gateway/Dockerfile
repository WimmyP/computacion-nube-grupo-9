FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias primero (para cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto de la aplicación
EXPOSE 4000

# Comando para desarrollo (usa nodemon para recarga automática)
CMD ["npm", "run", "dev"]
