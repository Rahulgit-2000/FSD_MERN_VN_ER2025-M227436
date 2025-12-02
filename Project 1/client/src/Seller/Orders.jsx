import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
            if (!sellerInfo) {
                // navigate('/seller/login'); // Optional: redirect if not logged in
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${sellerInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/seller/orders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const openDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeDetails = () => {
        setSelectedOrder(null);
    };

    return (
        <div>
            <div className="container" style={{ marginTop: '2rem' }}>
                <h1 className="page-title">My Orders</h1>
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="alert alert-info">No orders found for your products.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <span style={{ color: 'green' }}>Paid</span>
                                            ) : (
                                                <span style={{ color: 'red' }}>Not Paid</span>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                <span style={{ color: 'green' }}>Delivered</span>
                                            ) : (
                                                <span style={{ color: 'orange' }}>Processing</span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => openDetails(order)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedOrder && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                        <button
                            onClick={closeDetails}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginBottom: '1.5rem' }}>Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                        <p><strong>User:</strong> {selectedOrder.user && selectedOrder.user.name}</p>
                        <p><strong>Email:</strong> {selectedOrder.user && selectedOrder.user.email}</p>

                        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Shipping</h3>
                        <p>{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}</p>

                        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Payment</h3>
                        <p>Method: {selectedOrder.paymentMethod}</p>
                        <p>Status: {selectedOrder.isPaid ? `Paid on ${selectedOrder.paidAt?.substring(0, 10)}` : 'Not Paid'}</p>

                        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Order Items</h3>
                        <div className="order-items-list">
                            {selectedOrder.orderItems.map((item) => (
                                <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div>
                                        <p style={{ margin: 0, fontWeight: '500' }}>{item.name}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Items Price:</span>
                                <span>${selectedOrder.itemsPrice?.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Shipping:</span>
                                <span>${selectedOrder.shippingPrice?.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Tax:</span>
                                <span>${selectedOrder.taxPrice?.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                <span>Total:</span>
                                <span>${selectedOrder.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
