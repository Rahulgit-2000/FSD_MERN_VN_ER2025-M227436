import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const isNew = id === 'new';

    useEffect(() => {
        if (isNew) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
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
    }, [id, isNew, user.token]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
        try {
            const userData = {
                name,
                email,
                isAdmin,
            };
            if (password) {
                userData.password = password;
            }

            if (isNew) {
                await axios.post('/api/users', userData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } else {
                await axios.put(`/api/users/${id}`, userData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            }

            setLoadingUpdate(false);
            navigate('/admin/userlist');
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            setLoadingUpdate(false);
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="container">
            <Link to="/admin/userlist" className="back-btn">
                <ArrowLeft size={20} /> Back to Users
            </Link>
            <div className="auth-container" style={{ marginTop: '0' }}>
                <div className="auth-card" style={{ maxWidth: '600px' }}>
                    <div className="auth-header">
                        <h2>{isNew ? 'Create User' : 'Edit User'}</h2>
                    </div>
                    <form onSubmit={submitHandler} className="auth-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password {isNew ? '' : '(Leave blank to keep current)'}</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={isNew}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    style={{ width: 'auto', margin: 0 }}
                                />
                                Is Admin
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            {loadingUpdate ? 'Saving...' : (isNew ? 'Create' : 'Update')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
