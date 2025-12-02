import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (location.state && location.state.items) {
            setOrderItems(location.state.items);
        } else {
            setOrderItems(cartItems);
        }
    }, [location.state, cartItems]);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    // Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10); // Free shipping over $100
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                orderItems: orderItems,
                shippingAddress: {
                    address,
                    city,
                    postalCode,
                    country,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('/api/user/place-order', orderData, config);

            // Only clear cart if the order came from the cart (not direct buy)
            if (!location.state || !location.state.items) {
                clearCart();
            }

            if (paymentMethod === 'PayPal') {
                alert('Redirecting to PayPal for payment...');
                window.open('https://www.paypal.com', '_blank');
            }

            navigate('/my-orders');
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h1 className="page-title">Checkout</h1>
            <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="shipping-form">
                    <h2>Shipping Address</h2>
                    <form onSubmit={placeOrderHandler}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>City</label>
                            <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Country</label>
                            <input
                                type="text"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>

                        <h2 style={{ marginTop: '2rem' }}>Payment Method</h2>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>
                                <input
                                    type="radio"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                PayPal
                            </label>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>
                                <input
                                    type="radio"
                                    value="Credit Card"
                                    checked={paymentMethod === 'Credit Card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                Credit Card
                            </label>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>
                                <input
                                    type="radio"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === 'Cash on Delivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                Cash on Delivery
                            </label>
                        </div>

                        {paymentMethod === 'Credit Card' && (
                            <div className="credit-card-form" style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="0000 0000 0000 0000"
                                        required
                                        style={{ width: '100%', padding: '0.5rem' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="MM/YY"
                                            required
                                            style={{ width: '100%', padding: '0.5rem' }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="123"
                                            required
                                            style={{ width: '100%', padding: '0.5rem' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%', padding: '1rem' }}>
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="order-summary-checkout" style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '0.5rem', height: 'fit-content' }}>
                    <h2>Order Summary</h2>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Items</span>
                        <span>${itemsPrice}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Shipping</span>
                        <span>${shippingPrice}</span>
                    </div>
                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Tax</span>
                        <span>${taxPrice}</span>
                    </div>
                    <div className="summary-divider" style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></div>
                    <div className="summary-item total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>

                    <div className="cart-items-preview" style={{ marginTop: '2rem' }}>
                        <h3>Items in Order</h3>
                        {orderItems.map((item) => (
                            <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div>
                                    <p style={{ margin: 0, fontWeight: '500' }}>{item.name}</p>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
