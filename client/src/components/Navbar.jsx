import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, BookOpen, LogOut, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <BookOpen size={24} />
                    BookStore
                </Link>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
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
                                <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                    <Heart size={20} />
                                    Wishlist
                                </NavLink>
                            </li>
                            {user.isAdmin && (
                                <>
                                    <li>
                                        <NavLink to="/admin/booklist" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                            Books
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li className="user-info">
                                <User size={20} />
                                <span>{user.name}</span>
                            </li>
                            <li>
                                <button onClick={() => {
                                    logout();
                                    navigate('/');
                                }} className="nav-link btn-link">
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <User size={20} />
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
