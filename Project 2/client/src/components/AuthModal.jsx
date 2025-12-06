import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Mail, Lock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let result;
        if (isLogin) {
            result = await login(formData.email, formData.password);
        } else {
            result = await register(formData.username, formData.email, formData.password);
        }

        if (result.success) {
            onClose();
            setFormData({ username: '', email: '', password: '' });
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="modal active">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="modal-subtitle">
                    {isLogin ? 'Login to your account' : 'Join SkyWings today'}
                </p>

                {error && (
                    <div className="toast error show" style={{ position: 'static', transform: 'none', marginBottom: '1rem' }}>
                        <div className="toast-content">{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-with-icon">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock className="input-icon" />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary btn-block">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="modal-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? 'Sign up' : 'Login'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
