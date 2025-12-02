# MERN Bookstore

A full-stack online bookstore application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Register and login users.
- **Product Browsing**: View books with pagination and search functionality.
- **Book Details**: View detailed information, including a PDF-style preview of sample pages.
- **Shopping Cart**: Add items to cart, persistent across sessions.
- **Wishlist**: Save favorite books.
- **User Reviews**: Rate and review books.
- **Admin Dashboard**:
    - Manage Books (Create, Edit, Delete).
    - Manage Users (Create, Edit, Delete, Promote to Admin).
    - Manage PDF Previews.

## Tech Stack

- **Frontend**: React, Vite, React Router, Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (Authentication).

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB installed and running locally (or a cloud MongoDB URI).

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd BookStore
    ```

    **Option B: Manual Upload (Drag & Drop)**
    If you prefer not to use the command line:
    1.  Create a new repository on GitHub.
    2.  Open the repository page and click "Upload files".
    3.  Drag and drop your project files into the browser window.
    4.  **IMPORTANT**: Do NOT upload the `node_modules` folders (in both `client` and `server` directories). These are huge and will be re-installed automatically by the deployment platform.
    5.  Commit the changes.

2.  **Install Dependencies**

    *Server:*
    ```bash
    cd server
    npm install
    ```

    *Client:*
    ```bash
    cd ../client
    npm install
    ```

3.  **Environment Variables**

    Create a `.env` file in the `server` directory with the following:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/bookstore
    JWT_SECRET=your_jwt_secret_key_here
    ```

4.  **Seed Database (Optional)**
    To populate the database with sample data:
    ```bash
    cd server
    npm run data:import
    ```

### Running the Application

1.  **Start the Backend Server**
    ```bash
    cd server
    npm run dev
    ```
    Server will run on `http://localhost:5000`.

2.  **Start the Frontend Client**
    ```bash
    cd client
    npm run dev
    ```
    Client will run on `http://localhost:5173` (or similar).

## Usage

- **Admin Login**: `admin@example.com` / `123456`
- **User Login**: `john@example.com` / `123456`

## Deployment

For detailed instructions on how to deploy this application, please refer to the [Deployment Guide](DEPLOYMENT.md).

