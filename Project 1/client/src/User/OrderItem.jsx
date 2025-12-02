import React from 'react';

const OrderItem = ({ order }) => {
    return (
        <div className="order-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>Order ID: {order._id}</h3>
            <p>Book: {order.booktitle}</p>
            <p>Amount: ${order.totalamount}</p>
            <p>Status: {order.status || 'Processing'}</p>
        </div>
    );
};

export default OrderItem;
