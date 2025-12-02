import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const SellerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get(`/api/admin/seller/${id}`, config);
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchSeller();
    }, [id, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(
                `/api/admin/seller/${id}`,
                { name, email },
                config
            );
            navigate('/admin/sellers');
        } catch (error) {
            alert('Error updating seller');
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="auth-container">
            <div className="auth-card">
                <Link to="/admin/sellers" className="btn btn-outline" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="auth-header">
                    <h2>Edit Seller</h2>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerEdit;
