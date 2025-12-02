import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Store, UserPlus, Eye, EyeOff } from 'lucide-react';
import API_URL from '../apiConfig';

const Ssignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/api/seller/register`, { name, email, password });
            localStorage.setItem('sellerInfo', JSON.stringify(data));
            navigate('/seller/home');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Seller Registration</h2>
                    <p>Start your business with BookStore</p>
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
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
                        Register as Seller
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        Already have a seller account? <Link to="/seller/login">Login</Link>
                    </p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Not a Seller? <Link to="/login">Go to User Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ssignup;
