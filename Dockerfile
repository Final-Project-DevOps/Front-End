# # ======= STAGE 1: Build React App =======
# FROM node:18-alpine3.21 AS builder

# WORKDIR /app

# # Salin dependency file
# COPY package*.json ./

# # Install dependencies (ci untuk production dependency only)
# RUN npm ci

# # Salin seluruh project source
# COPY . .

# # Build React app (output ke folder build/)
# RUN npm run build

# # ======= STAGE 2: Serve with 'serve' (minimal runtime) =======
# FROM node:18-alpine3.21 AS runner

# WORKDIR /app

# # Install serve secara global untuk serving static file
# RUN npm install -g serve

# # Salin build hasil dari stage builder
# COPY --from=builder /app/build ./build

# # Expose port default serve (3000)
# EXPOSE 3000

# # Jalankan app pakai serve
# CMD ["serve", "-s", "build", "-l", "3000"]

# Build stage
FROM node:18-alpine3.18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.25.5-slim


# Copy build result ke nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
