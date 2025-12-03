FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Instalar dependencias de desarrollo globalmente si es necesario
RUN npm install -g typescript

# Puerto de Vite
EXPOSE 5173

# Comando para desarrollo con host 0.0.0.0 para Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]