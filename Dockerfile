# ---------- BUILD ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- PRODUCTION ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY /env.sh /env.sh
RUN chmod +x /env.sh

EXPOSE 80
ENTRYPOINT ["/env.sh"]
