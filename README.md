# Planner

Приложение состоит из:

- `backend` - Node.js/Express API, хранение данных, Telegram
- `frontend` - React/Vite интерфейс

## Quick Start

### Docker

```bash
docker compose up --build
```

Откройте:

```text
http://localhost:3000
```

### Без Docker

```bash
cd backend
npm install
npm start
```

Во втором терминале:

```bash
cd frontend
npm install
npm run dev
```

Откройте адрес Vite, обычно:

```text
http://localhost:5173
```

## Telegram

Если `TG_BOT_TOKEN` не задан, backend работает без Telegram.

### Основные переменные

```env
TG_BOT_TOKEN=
TG_POLLING_INTERVAL=2000
TELEGRAM_ALLOWED_CHAT_ID=
TG_PROXY_URL=
```

### Пример `backend/.env`

```env
PORT=3000
DATA_FILE_PATH=./data/events.json
TG_BOT_TOKEN=
TG_POLLING_INTERVAL=2000
TELEGRAM_ALLOWED_CHAT_ID=
TG_PROXY_URL=
LOG_DIR=./logs
LOG_LEVEL=info
BACKUP_DIR=./data/backups
BACKUP_KEEP_DAYS=7
APP_TIMEZONE=Asia/Tomsk
APP_LOCALE=ru-RU
```

## Данные

- `backend/data/events.json` - основные данные
- `backend/data/backups/` - резервные копии
- `backend/logs/` - логи

При Docker Compose эти папки монтируются как volume.

## Dev-режим

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

Сборка frontend:

```bash
cd frontend
npm run build
```
