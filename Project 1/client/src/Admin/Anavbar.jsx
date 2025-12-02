import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Anavbar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [newOrderCount, setNewOrderCount] = useState(0);
    const [totalOrderCount, setTotalOrderCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo) {
                    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    const { data } = await axios.get('/api/admin/stats', config);

                    const currentTotal = data.orders;
                    setTotalOrderCount(currentTotal);

                    const lastSeenCount = parseInt(localStorage.getItem('adminLastSeenOrderCount') || '0');

                    if (currentTotal > lastSeenCount) {
                        setNewOrderCount(currentTotal - lastSeenCount);
                    } else {
                        setNewOrderCount(0);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    const handleOrdersClick = () => {
        localStorage.setItem('adminLastSeenOrderCount', totalOrderCount.toString());
        setNewOrderCount(0);
    };

    const logoutHandler = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/admin/home" className="logo">BookStore Admin</Link>
                <div className="nav-links">
                    <NavLink to="/admin/home" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/admin/users" className="nav-link">Users</NavLink>
                    <NavLink to="/admin/sellers" className="nav-link">Sellers</NavLink>
                    <NavLink to="/admin/items" className="nav-link">Books</NavLink>
                    <NavLink to="/admin/orders" className="nav-link" onClick={handleOrdersClick}>
                        Orders
                        {newOrderCount > 0 && (
                            <span style={{
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.75rem',
                                marginLeft: '5px',
                                verticalAlign: 'top'
                            }}>
                                {newOrderCount}
                            </span>
                        )}
                    </NavLink>
                    <Link to="/" className="btn btn-primary btn-sm">Home</Link>
                    <button onClick={logoutHandler} className="btn btn-sm btn-outline" style={{ marginLeft: '1rem' }}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Anavbar;
