import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get(`/api/admin/user/${id}`, config);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchUser();
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
                `/api/admin/user/${id}`,
                { name, email, isAdmin },
                config
            );
            navigate('/admin/users');
        } catch (error) {
            alert('Error updating user');
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="auth-container">
            <div className="auth-card">
                <Link to="/admin/users" className="btn btn-outline" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="auth-header">
                    <h2>Edit User</h2>
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
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ width: 'auto' }}
                        />
                        <label htmlFor="isAdmin" style={{ marginBottom: 0 }}>Is Admin</label>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
