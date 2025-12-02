import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../apiConfig';

const Ahome = () => {
    const [stats, setStats] = useState({
        users: 0,
        sellers: 0,
        books: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo ? userInfo.token : null;

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await axios.get(`${API_URL}/api/admin/stats`, config);
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container">
            <div className="section-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your bookstore's users, sellers, and inventory.</p>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3>Users</h3>
                    <p>Manage registered users</p>
                    <h2 style={{ margin: '1rem 0', color: '#007bff' }}>{stats.users}</h2>
                    <Link to="/admin/users" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Users</Link>
                </div>

                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3>Sellers</h3>
                    <p>Manage approved sellers</p>
                    <h2 style={{ margin: '1rem 0', color: '#28a745' }}>{stats.sellers}</h2>
                    <Link to="/admin/sellers" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Sellers</Link>
                </div>

                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3>Books</h3>
                    <p>Manage book inventory</p>
                    <h2 style={{ margin: '1rem 0', color: '#ffc107' }}>{stats.books}</h2>
                    <Link to="/admin/items" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Books</Link>
                </div>

                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3>Orders</h3>
                    <p>Track customer orders</p>
                    <h2 style={{ margin: '1rem 0', color: '#dc3545' }}>{stats.orders}</h2>
                    <Link to="/admin/orders" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Orders</Link>
                </div>
            </div>
        </div>
    );
};

export default Ahome;
