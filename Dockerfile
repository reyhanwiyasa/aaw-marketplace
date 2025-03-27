FROM node:18.18.2 AS builder

WORKDIR /wishlist

COPY package.json ./

RUN npm install -g pnpm typescript

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18.18.2-slim

ENV PORT 8004
ENV NODE_ENV production

WORKDIR /wishlist

COPY --from=builder /wishlist/dist ./dist
COPY --from=builder /wishlist/package.json ./package.json

RUN npm install --only=production

EXPOSE 8004

CMD ["node", "dist/src/server.js"]