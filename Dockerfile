FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN sed -i 's|#error_page  404              /404.html;|error_page 404 /404.html;|' /etc/nginx/conf.d/default.conf
