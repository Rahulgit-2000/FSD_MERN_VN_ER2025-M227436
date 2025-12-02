import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, BookOpen, LogOut, Heart, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <BookOpen size={24} />
                    BookStore
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                            <div className="cart-icon-wrapper">
                                <ShoppingCart size={20} />
                                {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                            </div>
                            Cart
                        </NavLink>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                    <div className="cart-icon-wrapper">
                                        <Heart size={20} />
                                        {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
                                    </div>
                                    Wishlist
                                </NavLink>
                            </li>

                            {user.isAdmin && (
                                <>
                                    <li>
                                        <NavLink to="/admin/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li className="user-info">
                                <Link to="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={closeMenu}>
                                    <User size={20} />
                                    <span>{user.name}</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => {
                                    logout();
                                    navigate('/');
                                    closeMenu();
                                }} className="nav-link btn-link">
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                    <User size={20} />
                                    Login
                                </NavLink>
                            </li>

                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
