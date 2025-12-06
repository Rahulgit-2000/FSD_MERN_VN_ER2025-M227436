import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Plane } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <nav className="navbar">
                <div className="container nav-container">
                    <NavLink to="/" className="nav-brand">
                        <Plane className="brand-icon" />
                        <span className="brand-name">SkyWings</span>
                    </NavLink>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>Home</NavLink>
                        <NavLink to="/flights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Flights</NavLink>
                        <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>My Bookings</NavLink>
                        {user && user.userType === 'admin' && (
                            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Admin Panel</NavLink>
                        )}
                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
                    </div>

                    <div className="nav-actions">
                        {user ? (
                            <div
                                className="user-menu"
                                onMouseEnter={() => setIsUserDropdownOpen(true)}
                                onMouseLeave={() => setIsUserDropdownOpen(false)}
                            >
                                <button className="user-avatar">
                                    {user.username.charAt(0).toUpperCase()}
                                </button>
                                <div className={`dropdown-menu ${isUserDropdownOpen ? 'active' : ''}`} style={{ visibility: isUserDropdownOpen ? 'visible' : 'hidden', opacity: isUserDropdownOpen ? 1 : 0 }}>
                                    <div className="dropdown-header">
                                        <p className="user-name">{user.username}</p>
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                    <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                                    <NavLink to="/bookings" className="dropdown-item">My Bookings</NavLink>

                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        <LogOut size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button className="btn-secondary" onClick={() => setIsAuthModalOpen(true)}>Login</button>
                                <button className="btn-primary" onClick={() => setIsAuthModalOpen(true)}>Sign Up</button>
                            </>
                        )}

                        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;
