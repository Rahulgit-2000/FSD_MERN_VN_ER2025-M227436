import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft, Store, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';

const SellerAdd = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(
                '/api/admin/seller',
                { name, email, password },
                config
            );
            navigate('/admin/sellers');
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating seller');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <Link to="/admin/sellers" className="btn btn-outline" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="auth-header">
                    <h2>Create Seller</h2>
                    <p>Add a new seller to the platform</p>
                </div>
                <form onSubmit={submitHandler} className="auth-form">
                    <div className="form-group">
                        <label>Business Name</label>
                        <div className="input-wrapper">
                            <Store className="input-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Enter business name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#6b7280'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        <UserPlus size={20} />
                        Create Seller
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerAdd;
