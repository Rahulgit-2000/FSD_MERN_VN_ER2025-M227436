import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import About from './pages/About';
import Profile from './pages/Profile';

import Footer from './components/Footer';

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
