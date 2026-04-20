FROM node:20-alpine AS frontend-build

WORKDIR /repo/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/. ./
RUN npm run build


FROM node:20-alpine AS runtime

WORKDIR /repo/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/src ./src
COPY --from=frontend-build /repo/frontend/dist /repo/frontend/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/server.js"]
