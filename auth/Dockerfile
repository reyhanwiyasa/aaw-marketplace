# Base image with Node.js
FROM node:18.18.2 AS builder

# Set working directory in the container
WORKDIR /app

# Copy the package.json file and install pnpm and typescript
COPY package.json ./
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

# Copy the rest of the code
COPY . .

# Build the application
RUN pnpm run build

# Production image using slim version of Node.js
FROM node:18.18.2-slim

# Environment variables
ENV PORT 8888 
ENV NODE_ENV production

# Set working directory in the container
WORKDIR /app

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8888

# Command to run the application
CMD ["node", "dist/src/server.js"]
