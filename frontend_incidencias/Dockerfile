# ---- Etapa 1: build de Angular ----
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build --configuration production

# ---- Etapa 2: servidor con Nginx ----
FROM nginx:alpine

# Copia build al servidor web
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
