import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);
    const [totalBooksOrdered, setTotalBooksOrdered] = useState(0);

    const { user, login } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);

            // Fetch Orders
            const fetchOrders = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    const { data } = await axios.get('/api/user/my-orders', config);
                    setOrders(data);

                    // Calculate total books ordered
                    const count = data.reduce((acc, order) => {
                        return acc + order.orderItems.reduce((itemAcc, item) => itemAcc + item.qty, 0);
                    }, 0);
                    setTotalBooksOrdered(count);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };
            fetchOrders();
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                '/api/user/profile',
                { name, email, password },
                config
            );

            setLoading(false);
            setMessage('Profile Updated Successfully');
            // Update local storage and context with new user info
            login(data);
        } catch (err) {
            setLoading(false);
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
            <div className="form-container" style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>User Profile</h1>

                {message && <div className="alert alert-success" style={{ backgroundColor: '#d1e7dd', color: '#0f5132', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{message}</div>}
                {error && <div className="alert alert-danger" style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={submitHandler}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                        <div className="input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <div className="input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                        <div className="input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm Password</label>
                        <div className="input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>

            <div className="orders-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="page-title" style={{ margin: 0 }}>My Orders</h2>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 'bold' }}>
                        Total Books Ordered: {totalBooksOrdered}
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="alert alert-info">You have no orders.</div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-card" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                <div className="order-header" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', gap: '2rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>Order Placed</div>
                                            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>Total</div>
                                            <div>${order.totalPrice}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>Ship To</div>
                                            <div>{order.shippingAddress.address}, {order.shippingAddress.city}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>Order # {order._id}</div>
                                    </div>
                                </div>
                                <div className="order-body" style={{ padding: '1.5rem' }}>
                                    <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: order.isDelivered ? 'green' : 'orange' }}>
                                        {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Processing'}
                                    </div>
                                    {order.orderItems.map((item) => (
                                        <div key={item.product} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                            <div>
                                                <Link to={`/book/${item.product}`} style={{ fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none' }}>
                                                    {item.name}
                                                </Link>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                                                    Qty: {item.qty}
                                                </div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                                    Price: ${item.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
