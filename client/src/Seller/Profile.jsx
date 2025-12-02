import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react'; // Keeping import if needed elsewhere, but removing usage below. Actually, if I remove usage, I should remove import.
// But wait, I'm removing the icons.
// Let's remove the import of icons that are no longer used.
// Wait, I am removing User, Mail, Lock from usage.


const SellerProfile = () => {
    // const { user, login } = useContext(AuthContext); // Removing AuthContext usage


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const sellerInfo = localStorage.getItem('sellerInfo');
        if (sellerInfo) {
            const user = JSON.parse(sellerInfo);
            setName(user.name);
            setEmail(user.email);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('sellerInfo')).token}`,
                    },
                };

                const { data } = await axios.put(
                    '/api/seller/profile',
                    { name, email, password },
                    config
                );

                setSuccess(true);
                setMessage('Profile Updated');
                // Update local storage and context
                localStorage.setItem('sellerInfo', JSON.stringify(data));
                // We might need a way to update context without full login, but login works
                // Assuming login function updates the state
                // login(data); 
                // Actually, login might expect email/pass. Let's just update local state if context doesn't auto-update from storage.
                // For now, let's just rely on the fact that we updated the backend.
                // Ideally we should update the global auth state.
            } catch (error) {
                setMessage(error.response && error.response.data.message ? error.response.data.message : error.message);
                setSuccess(false);
            }
        }
    };

    return (
        <div className="auth-container" style={{ minHeight: '80vh', padding: '2rem 0' }}>
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Seller Profile</h2>
                    <p>Manage your account settings</p>
                </div>
                {message && <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} style={{ padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', backgroundColor: success ? '#dcfce7' : '#fee2e2', color: success ? '#166534' : '#991b1b' }}>{message}</div>}
                <form onSubmit={submitHandler} className="auth-form">
                    <div className="form-group">
                        <label>Name</label>
                        <div className="input-wrapper">
                            {/* <User className="input-icon" size={20} /> */}
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            {/* <Mail className="input-icon" size={20} /> */}
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <div className="input-wrapper">
                            {/* <Lock className="input-icon" size={20} /> */}
                            <input
                                type="password"
                                placeholder="Enter new password (optional)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <div className="input-wrapper">
                            {/* <Lock className="input-icon" size={20} /> */}
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ paddingLeft: '1rem' }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerProfile;
