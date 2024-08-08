# Etapa base
FROM node:20.12.0-alpine3.19 AS base
RUN npm install -g pnpm
# Etapa de dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./pnpm-lock.yaml ./package.json ./
RUN pnpm install
# Etapa de construcción
FROM base AS builder
ARG ENVS=dev-ar
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY ./envs/${ENVS}.env /app/.env
RUN pnpm run build
# Etapa final con Nginx
FROM nginx:alpine AS runner
# Copia los archivos construidos al contenedor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist/.vite/manifest.json /usr/share/nginx/html

# Copia el archivo de configuración de Nginx si es necesario
COPY nginx.conf /etc/nginx/nginx.conf
# Expone el puerto en el que Nginx está escuchando
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
