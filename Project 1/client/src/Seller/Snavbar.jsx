import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Snavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';
    const [newOrderCount, setNewOrderCount] = useState(0);
    const [totalOrderCount, setTotalOrderCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
                if (sellerInfo) {
                    const config = { headers: { Authorization: `Bearer ${sellerInfo.token}` } };
                    const { data } = await axios.get('/api/seller/stats', config);

                    const currentTotal = data.totalOrders;
                    setTotalOrderCount(currentTotal);

                    const lastSeenCount = parseInt(localStorage.getItem('sellerLastSeenOrderCount') || '0');

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
        localStorage.setItem('sellerLastSeenOrderCount', totalOrderCount.toString());
        setNewOrderCount(0);
    };

    const logoutHandler = () => {
        localStorage.removeItem('sellerInfo');
        navigate('/seller/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/seller/home" className="logo">BookStore Seller</Link>
                <div className="nav-links">
                    <Link to="/seller/home" className={isActive('/seller/home')}>Dashboard</Link>
                    <Link to="/seller/products" className={isActive('/seller/products')}>My Products</Link>
                    <Link to="/seller/add-book" className={isActive('/seller/add-book')}>Add Book</Link>
                    <Link to="/seller/orders" className={isActive('/seller/orders')} onClick={handleOrdersClick}>
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
                    </Link>
                    <Link to="/seller/profile" className={isActive('/seller/profile')}>Profile</Link>
                    <button onClick={logoutHandler} className="btn btn-sm btn-outline">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Snavbar;
