FROM node:alpine as build-stage

WORKDIR /app/client

# Install dependencies
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# SERVING IMAGE
FROM fitiavana07/nginx-react

# Copy built files
COPY --from=build-stage /app/client/dist /usr/share/nginx/html

# 80 for HTTP
EXPOSE 80

# Run nginx
CMD nginx -g 'daemon off;'