import React from 'react';
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Shome = () => {
    const [stats, setStats] = React.useState({
        totalProducts: 0,
        totalOrders: 0,
        totalEarnings: 0,
        growth: 0
    });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
                if (sellerInfo) {
                    const config = { headers: { Authorization: `Bearer ${sellerInfo.token}` } };
                    const { data } = await axios.get('/api/seller/stats', config);
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="home-page" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Seller Dashboard</h2>
                    <p className="text-light">Welcome back to your seller panel</p>
                </div>

                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                            <Package size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{stats.totalProducts}</h3>
                            <p style={{ color: '#64748b', margin: 0 }}>Total Products</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534' }}>
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{stats.totalOrders}</h3>
                            <p style={{ color: '#64748b', margin: 0 }}>Total Orders</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#b45309' }}>
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>${stats.totalEarnings}</h3>
                            <p style={{ color: '#64748b', margin: 0 }}>Total Earnings</p>
                        </div>
                    </div>


                </div>

                <div className="section-header">
                    <h3>Quick Actions</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/seller/add-book" className="btn btn-primary">Add New Book</Link>
                    <Link to="/seller/products" className="btn btn-outline">Manage Products</Link>
                    <Link to="/seller/orders" className="btn btn-outline">View Orders</Link>
                </div>
            </div>
        </div>
    );
};

export default Shome;
