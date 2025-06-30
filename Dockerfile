<<<<<<< HEAD
# Basis-Image mit Node.js
FROM node:18-alpine as build

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# Projektdateien kopieren und bauen
COPY . .
RUN npm run build

# Production-Image mit Nginx
FROM nginx:alpine

# React-Build ins nginx-Verzeichnis kopieren
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Custom nginx config (wenn vorhanden)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponiere Port 80
EXPOSE 80

# Startbefehl
CMD ["nginx", "-g", "daemon off;"]
=======
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY . .
>>>>>>> 5b912981d4f36f512e54470f5747008695881c4b
