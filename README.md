
---

## 📁 `backend/README.md`

```md
# 🔧 Gas Fee Analyzer Backend (NestJS)

This is the **backend API and WebSocket server** for the Gas Fee Analyzer.  
It fetches real-time and historical gas data from Owlracle API and serves it to the frontend. It also pushes live updates over WebSocket and handles backend scheduling via cron jobs.

---

## ⚙️ Tech Stack

- **NestJS** (REST API + WebSocket)
- **@nestjs/schedule** – Cron job support
- **@nestjs/axios** – API fetching
- **Socket.IO Gateway** – Real-time push to frontend
- **Hosted on Render**

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                                |
|--------|---------------------------|--------------------------------------------|
| GET    | `/gas/:chainId`           | Returns current gas price for a chain      |
| GET    | `/gas/history/:chainId`   | Returns historical gas price data          |
| GET    | `/health`                 | Basic uptime monitor endpoint              |

---

## 🔌 WebSocket Events

- `onChainId`: Receives selected chain ID from frontend
- `gasPriceUpdate`: Pushes updated gas fee info to frontend

---

## ⏱ Cron Job Logic

### Every 1 minute:
- Fetches real-time gas price from Owlracle API
- Emits update via WebSocket

### Every 30 minutes:
- Fetches gas price history (for chart data)

---

## 🛠 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/gas-fee-analyzer.git
cd backend
npm install
