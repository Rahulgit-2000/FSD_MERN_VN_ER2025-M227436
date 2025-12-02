import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, Check } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Seller = () => {
    const [sellers, setSellers] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('/api/admin/sellers', config);
                setSellers(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (user) fetchSellers();
    }, [user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this seller?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/admin/seller/${id}`, config);
                setSellers(sellers.filter((seller) => seller._id !== id));
            } catch (error) {
                alert('Error deleting seller');
            }
        }
    };

    const approveHandler = async (id) => {
        if (window.confirm('Are you sure you want to approve this seller?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.put(`/api/admin/seller/approve/${id}`, {}, config);
                setSellers(sellers.map(seller =>
                    seller._id === id ? { ...seller, isApproved: true } : seller
                ));
            } catch (error) {
                alert('Error approving seller');
            }
        }
    };

    const updateRatingHandler = async (id, currentRating) => {
        const newRating = prompt('Enter new rating (0-5):', currentRating);
        if (newRating !== null) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.put(`/api/admin/seller/rating/${id}`, { rating: Number(newRating) }, config);
                setSellers(sellers.map(s => s._id === id ? { ...s, rating: Number(newRating) } : s));
            } catch (error) {
                alert('Error updating rating');
            }
        }
    };

    const createSellerHandler = () => {
        navigate('/admin/sellers/add');
    };

    return (
        <div className="container">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="page-title">Manage Sellers</h1>
                <button className="btn btn-primary" onClick={createSellerHandler}>
                    <Plus size={20} /> Create Seller
                </button>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>APPROVED</th>
                            <th>RATING</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller._id}>
                                <td>{seller._id}</td>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {seller.isApproved ? (
                                        <span style={{ color: 'green' }}>Yes</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>No</span>
                                    )}
                                </td>
                                <td>
                                    <div
                                        onClick={() => updateRatingHandler(seller._id, seller.rating)}
                                        style={{ cursor: 'pointer', display: 'flex' }}
                                        title="Click to edit rating"
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{ color: i < (seller.rating || 0) ? '#ffc107' : '#e4e5e9', fontSize: '1.2rem' }}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {!seller.isApproved && (
                                            <button
                                                className="action-btn"
                                                onClick={() => approveHandler(seller._id)}
                                                title="Approve"
                                                style={{ color: 'green' }}
                                            >
                                                <Check size={18} />
                                            </button>
                                        )}
                                        <Link to={`/admin/seller/${seller._id}/edit`} className="action-btn" style={{ color: 'var(--primary)' }}>
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            className="action-btn"
                                            onClick={() => deleteHandler(seller._id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Seller;
