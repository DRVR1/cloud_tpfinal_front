# ========================
# Etapa 1: Build
# ========================
FROM node:20-alpine AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la app
COPY . .

# Generar la versión de producción
RUN npm run build

# ========================
# Etapa 2: Servir con Nginx
# ========================
FROM nginx:alpine

# Copiar el build generado en la etapa anterior a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx (opcional, para SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
