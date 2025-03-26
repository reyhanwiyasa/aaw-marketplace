FROM node:18.18.2 AS builder

WORKDIR /auth

COPY package.json ./

RUN npm install -g pnpm typescript

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /auth

RUN npm install -g pnpm

COPY --from=builder /auth/dist ./dist
COPY --from=builder /auth/package.json ./package.json

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/src/server.js"]