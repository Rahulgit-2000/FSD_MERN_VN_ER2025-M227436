# 🚀 Deployment Guide

This guide outlines the steps to deploy the SkyWings Flight Booking Application. The project consists of a **Node.js/Express backend** and a **React (Vite) frontend**.

## 📋 Prerequisites

Ensure the following are installed on your deployment server:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher) - Local or Atlas URI

## 🛠️ Installation

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd flight-booking-app
    ```

2.  **Install Dependencies**
    You need to install dependencies for both the server and client.
    
    *Root/Server:*
    ```bash
    npm install
    cd server && npm install
    ```
    
    *Client:*
    ```bash
    cd ../client && npm install
    ```

## ⚙️ Configuration

1.  **Environment Variables**
    Create a `.env` file in the root directory (based on `.env.example`):
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/flight-booking
    JWT_SECRET=your_production_secret_key
    NODE_ENV=production
    ```

## 🏗️ Build (Frontend)

The React frontend needs to be built for production.

```bash
cd client
npm run build
```
This generates a `dist` folder in the `client` directory containing the static assets.

## 🚀 Running the Application

### Option 1: Development Mode
Run both client and server concurrently (if set up) or in separate terminals:
```bash
# Terminal 1 (Server)
cd server
npm run dev

# Terminal 2 (Client)
cd client
npm run dev
```

### Option 2: Production
1.  **Serve Static Files**: Ensure your Express server is configured to serve the `client/dist` folder in production.
2.  **Start Server**:
    ```bash
    cd server
    npm start
    ```
    
    *Note: If using a process manager like PM2:*
    ```bash
    pm2 start server/server.js --name "skywings-api"
    ```

## 🔍 Verification

1.  Navigate to your server's URL (e.g., `http://localhost:5000` or your domain).
2.  Verify the React app loads correctly.
3.  Test API calls (Login, Search Flights) to ensure backend connectivity.
