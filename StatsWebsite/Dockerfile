# Basis-Image: Offizielles Nginx-Image verwenden
FROM nginx:alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/share/nginx/html

# Entferne die Standard-Nginx-Dateien
RUN rm -rf ./*

# Kopiere die bereits gebaute Angular-App (dist/<app-name>) in das Nginx-Verzeichnis
COPY ./stats-website .

# Kopiere die benutzerdefinierte Nginx-Konfiguration für SPA-Routing
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponiere den Standard-HTTP-Port
EXPOSE 80

# Startet Nginx
CMD ["nginx", "-g", "daemon off;"]


