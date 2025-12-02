# Deployment Guide

This guide provides step-by-step instructions to deploy the MERN Bookstore application.

## Prerequisites

- A GitHub account.
- Accounts on deployment platforms (e.g., [Vercel](https://vercel.com/) for client, [Render](https://render.com/) for server).
- A [MongoDB Atlas](https://www.mongodb.com/atlas/database) account for the database.

---

## 1. Database Deployment (MongoDB Atlas)

1.  **Create a Cluster**: Log in to MongoDB Atlas and create a new cluster (the free tier is sufficient).
2.  **Create a Database User**: Go to "Database Access" and create a user with read/write privileges. Remember the password.
3.  **Network Access**: Go to "Network Access" and allow access from anywhere (`0.0.0.0/0`) or whitelist specific IPs.
4.  **Get Connection String**:
    - Click "Connect" on your cluster.
    - Choose "Drivers".
    - Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    - Replace `<username>` and `<password>` with your credentials.

---

## 2. Server Deployment (Render)

We will use [Render](https://render.com/) to host the Node.js/Express backend.

1.  **Push Code to GitHub**:
    - **Option A (Command Line)**: Initialize git, commit, and push to your repository.
    - **Option B (Drag & Drop)**: Create a repo on GitHub, click "Upload files", and drag your project folders.
        - **CRITICAL**: Do NOT upload `node_modules`. Exclude the `node_modules` folder from both `client` and `server` before dragging.
2.  **Create a Web Service**:
    - Log in to Render and click "New" -> "Web Service".
    - Connect your GitHub repository.
3.  **Configure Service**:
    - **Root Directory**: `server` (Important: The backend code is in the `server` folder).
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
4.  **Environment Variables**:
    - Scroll down to "Environment Variables" and add the following:
        - `MONGO_URI`: Your MongoDB Atlas connection string.
        - `JWT_SECRET`: A strong secret key for authentication.
        - `PORT`: `10000` (or let Render assign one, but 10000 is standard).
5.  **Deploy**: Click "Create Web Service". Render will build and deploy your server.
6.  **Copy URL**: Once deployed, copy the service URL (e.g., `https://bookstore-api.onrender.com`).

---

## 3. Client Deployment (Vercel)

We will use [Vercel](https://vercel.com/) to host the React/Vite frontend.

1.  **Import Project**:
    - Log in to Vercel and click "Add New..." -> "Project".
    - Import your GitHub repository.
2.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: Click "Edit" and select `client`.
3.  **Environment Variables**:
    - Add any environment variables your client needs.
    - If your client makes API calls to the backend, you likely need to update your API base URL in the code to point to the deployed server URL (from step 2) instead of `localhost`.
    - *Tip*: It's best practice to use an environment variable like `VITE_API_URL` in your React code.
        - Add `VITE_API_URL` = `https://bookstore-api.onrender.com` (your Render URL).
4.  **Deploy**: Click "Deploy".
5.  **Visit Site**: Once finished, your application will be live!

---

## 4. Post-Deployment Configuration

### Update Client API Calls
Ensure your frontend code uses the deployed backend URL.
If you hardcoded `http://localhost:5000`, replace it with your Render URL or use an environment variable:

```javascript
// Example in your axios config or api service
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### CORS Configuration (Server)
If you encounter CORS errors, update your server's CORS configuration to allow requests from your deployed frontend domain.

In `server/server.js` (or wherever cors is configured):
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
```
