import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Check, X, Edit, Plus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get('/api/admin/users', config);
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, [user]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                await axios.delete(`/api/admin/user/${id}`, config);
                setUsers(users.filter((u) => u._id !== id));
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const createUserHandler = () => {
        navigate('/admin/users/add');
    };



    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="container">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="page-title">Users</h1>
                <button className="btn btn-primary" onClick={createUserHandler}>
                    <Plus size={20} /> Create User
                </button>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>

                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <Check color="green" size={20} />
                                    ) : (
                                        <X color="red" size={20} />
                                    )}
                                </td>

                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/admin/user/${user._id}/edit`} className="action-btn" style={{ color: 'var(--primary)' }}>
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            className="action-btn"
                                            onClick={() => deleteHandler(user._id)}
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

export default UserList;
