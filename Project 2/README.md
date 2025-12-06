# ✈️ SkyWings - Flight Booking Application

A comprehensive full-stack flight booking application built with **Node.js**, **Express.js**, **MongoDB**, and **Vanilla JavaScript** following the **MVC (Model-View-Controller)** architectural pattern.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)

## ✨ Features

### For Travelers (Customers)

- **User Registration & Authentication**: Secure signup/login with JWT tokens
- **Flight Search & Booking**: Search flights by origin, destination, date, and class
- **Real-time Availability**: View available seats and pricing
- **Booking Management**: View, modify, and cancel reservations
- **Multiple Payment Methods**: Credit card, debit card, UPI, net banking, wallet
- **Add-ons**: Meals, extra baggage, travel insurance
- **User Profile**: Manage personal details and travel preferences

### For Admins

- **Flight Management**: Add, edit, and delete flight schedules
- **Booking Overview**: Monitor all user bookings
- **Dashboard Analytics**: View business performance metrics
- **User Management**: Manage customer accounts

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern design system
- **Vanilla JavaScript** - Logic and interactivity
- **Fetch API** - HTTP requests

## 🏗️ Architecture

This application follows the **MVC (Model-View-Controller)** pattern:

### Model Layer (Data)
- `User.js` - User schema with authentication
- `Flight.js` - Flight details and availability
- `Booking.js` - Booking information and transactions

### Controller Layer (Business Logic)
- `authController.js` - Authentication operations
- `flightController.js` - Flight CRUD operations
- `bookingController.js` - Booking management

### View Layer (Routes)
- `authRoutes.js` - Authentication endpoints
- `flightRoutes.js` - Flight endpoints
- `bookingRoutes.js` - Booking endpoints

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   \`\`\`bash
   cd "Project 2"
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flight-booking
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   \`\`\`

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   \`\`\`bash
   mongod
   \`\`\`

5. **Seed the database** (Optional but recommended)
   \`\`\`bash
   npm run seed
   \`\`\`

6. **Start the server**
   \`\`\`bash
   npm start
   \`\`\`
   
   For development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Access the application**
   
   Open your browser and navigate to:
   \`\`\`
   http://localhost:5000
   \`\`\`

## 🚀 Usage

### Default Credentials

After running the seed script, you can use these credentials:

**Admin Account:**
- Email: `admin@flightbooking.com`
- Password: `admin123`

**Customer Account:**
- Email: `arjun@example.com`
- Password: `password123`

### Customer Workflow

1. **Sign Up / Login** - Create an account or login
2. **Search Flights** - Enter origin, destination, and travel dates
3. **Browse Results** - View available flights with pricing
4. **Book Flight** - Select flight, choose class, add passengers
5. **Complete Payment** - Choose payment method and confirm
6. **Manage Bookings** - View and manage your reservations

### Admin Workflow

1. **Login** - Use admin credentials
2. **Manage Flights** - Add, edit, or delete flights
3. **View Bookings** - Monitor all customer bookings
4. **Analytics** - Track business performance

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get single flight
- `POST /api/flights/search` - Search flights
- `POST /api/flights` - Create flight (Admin only)
- `PUT /api/flights/:id` - Update flight (Admin only)
- `DELETE /api/flights/:id` - Delete flight (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)
- `GET /api/bookings` - Get all bookings (Admin only)


## 👥 User Roles

### Customer
- Sign up and manage profile
- Search and book flights
- View and manage bookings
- Make secure payments
- Add travel preferences

### Admin
- Manage all flights
- View all bookings
- Add/edit/delete flights
- Monitor system analytics
- Manage user accounts

## 🎨 Design Features

- **Modern UI/UX**: Premium design with smooth animations
- **Responsive**: Works on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark color scheme
- **Glassmorphism**: Modern glass effect design elements
- **Micro-animations**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and keyboard navigation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based access control
- Input validation
- CORS enabled

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Flight status tracking
- [ ] Loyalty program
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for seamless flight booking experience.

---

**Happy Flying! ✈️**
