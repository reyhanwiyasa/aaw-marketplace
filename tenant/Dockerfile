FROM node:18.18.2 AS builder

WORKDIR /tenant

COPY package.json ./

RUN npm install -g pnpm typescript

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.18.2-slim

ENV PORT 8003
ENV NODE_ENV production

WORKDIR /tenant

COPY --from=builder /tenant/dist ./dist
COPY --from=builder /tenant/package.json ./package.json

RUN npm install --only=production

EXPOSE 8003

CMD ["node", "dist/src/server.js"]