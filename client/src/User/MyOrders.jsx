import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    const { data } = await axios.get('/api/user/my-orders', config);
                    setOrders(data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h1 className="page-title">My Orders</h1>
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
    );
};

export default MyOrders;
