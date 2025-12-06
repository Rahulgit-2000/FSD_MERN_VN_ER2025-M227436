import { useState, useEffect } from 'react';
import { getAdminFlights, createFlight, deleteFlight, getAllBookings, updateBooking, getAllUsers, deleteUser, createUser } from '../services/api';
import { Plus, Trash2, Plane, Calendar, MapPin, Users } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('flights');
    const [flights, setFlights] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        userType: 'customer'
    });
    const [newFlight, setNewFlight] = useState({
        flightId: '',
        airline: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        basePrice: ''
    });

    useEffect(() => {
        fetchFlights();
        fetchBookings();
        fetchUsers();
    }, []);

    const fetchFlights = async () => {
        try {
            const data = await getAdminFlights();
            setFlights(data.data || []);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const fetchBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data.data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            // Calculate duration
            const start = new Date(newFlight.departureTime);
            const end = new Date(newFlight.arrivalTime);
            const diff = end - start;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const duration = `${hours}h ${minutes}m`;

            const flightData = {
                ...newFlight,
                flightName: newFlight.airline, // Use airline as flight name by default
                duration,
                totalSeats: 180, // Default capacity
                availableSeats: 180,
                classes: [
                    { className: 'economy', price: Number(newFlight.basePrice), availableSeats: 120 },
                    { className: 'premium-economy', price: Number(newFlight.basePrice) * 1.5, availableSeats: 30 },
                    { className: 'business', price: Number(newFlight.basePrice) * 3, availableSeats: 30 }
                ]
            };

            await createFlight(flightData);
            setShowAddModal(false);
            setNewFlight({
                flightId: '',
                airline: '',
                origin: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                basePrice: ''
            });
            fetchFlights();
            alert('Flight added successfully');
        } catch (error) {
            console.error('Add flight error:', error);
            alert('Failed to add flight: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteFlight = async (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            try {
                await deleteFlight(id);
                fetchFlights();
            } catch (error) {
                alert('Failed to delete flight');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await createUser(newUser);
            setShowAddUserModal(false);
            setNewUser({
                username: '',
                email: '',
                password: '',
                userType: 'customer'
            });
            fetchUsers();
            alert('User created successfully');
        } catch (error) {
            console.error('Add user error:', error);
            alert('Failed to add user: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdateBookingStatus = async (id, status) => {
        if (window.confirm(`Are you sure you want to mark this booking as ${status}?`)) {
            try {
                await updateBooking(id, status);
                fetchBookings();
            } catch (error) {
                alert('Failed to update booking status');
            }
        }
    };

    return (
        <div className="container page active">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Manage flights and view bookings</p>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
                    onClick={() => setActiveTab('flights')}
                >
                    Manage Flights
                </button>
                <button
                    className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    View Bookings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Manage Users
                </button>
            </div>

            {activeTab === 'flights' && (
                <div className="admin-tab-content active">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                            <Plus size={20} style={{ marginRight: '0.5rem' }} />
                            Add New Flight
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Airline</th>
                                    <th>Route</th>
                                    <th>Schedule</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map(flight => (
                                    <tr key={flight._id}>
                                        <td style={{ fontWeight: '600' }}>{flight.flightId}</td>
                                        <td>{flight.airline}</td>
                                        <td>{flight.origin.split(' ')[0]} → {flight.destination.split(' ')[0]}</td>
                                        <td>
                                            {new Date(flight.departureTime).toLocaleDateString()} <br />
                                            <span style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                                                {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                            ₹{flight.classes.find(c => c.className === 'economy')?.price.toLocaleString() || 'N/A'}
                                        </td>
                                        <td>
                                            <button
                                                className="btn-icon"
                                                style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                onClick={() => handleDeleteFlight(flight._id)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'bookings' && (
                <div className="admin-tab-content active">
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>User</th>
                                    <th>Flight</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>{booking._id.slice(-6).toUpperCase()}</td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{booking.userId?.username || 'Unknown'}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>{booking.userId?.email}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{booking.flightId?.flightId}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                                                {booking.origin.split(' ')[0]} → {booking.destination.split(' ')[0]}
                                            </div>
                                        </td>
                                        <td>
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${booking.status}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <td>
                                                {booking.status === 'confirmed' && (
                                                    <button
                                                        className="btn-secondary"
                                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                                                        onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                                {booking.status === 'pending' && (
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            className="btn-primary"
                                                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                            onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="btn-secondary"
                                                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                                                            onClick={() => handleUpdateBookingStatus(booking._id, 'rejected')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {
                activeTab === 'users' && (
                    <div className="admin-tab-content active">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                            <button className="btn-primary" onClick={() => setShowAddUserModal(true)}>
                                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                                Add New User
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td style={{ fontWeight: '600' }}>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={`status-badge ${user.userType === 'admin' ? 'confirmed' : 'pending'}`} style={{ background: user.userType === 'admin' ? 'var(--primary-light)' : '#f3f4f6', color: user.userType === 'admin' ? 'var(--primary)' : '#374151' }}>
                                                    {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                                                </span>
                                            </td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {user.userType !== 'admin' && (
                                                    <button
                                                        className="btn-icon"
                                                        style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                        onClick={() => handleDeleteUser(user._id)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                )}

            {/* Add Flight Modal */}
            {
                showAddModal && (
                    <div className="modal active">
                        <div className="modal-overlay" onClick={() => setShowAddModal(false)}></div>
                        <div className="modal-content">
                            <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
                            <h2>Add New Flight</h2>
                            <form onSubmit={handleAddFlight}>
                                <div className="form-group">
                                    <label>Flight ID</label>
                                    <input
                                        type="text"
                                        value={newFlight.flightId}
                                        onChange={e => setNewFlight({ ...newFlight, flightId: e.target.value })}
                                        required
                                        placeholder="e.g. AI-202"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Airline</label>
                                    <input
                                        type="text"
                                        value={newFlight.airline}
                                        onChange={e => setNewFlight({ ...newFlight, airline: e.target.value })}
                                        required
                                        placeholder="e.g. Air India"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Origin</label>
                                        <input
                                            type="text"
                                            value={newFlight.origin}
                                            onChange={e => setNewFlight({ ...newFlight, origin: e.target.value })}
                                            required
                                            placeholder="e.g. Delhi (DEL)"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Destination</label>
                                        <input
                                            type="text"
                                            value={newFlight.destination}
                                            onChange={e => setNewFlight({ ...newFlight, destination: e.target.value })}
                                            required
                                            placeholder="e.g. Mumbai (BOM)"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Departure</label>
                                        <input
                                            type="datetime-local"
                                            value={newFlight.departureTime}
                                            onChange={e => setNewFlight({ ...newFlight, departureTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Arrival</label>
                                        <input
                                            type="datetime-local"
                                            value={newFlight.arrivalTime}
                                            onChange={e => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Base Price (₹)</label>
                                    <input
                                        type="number"
                                        value={newFlight.basePrice}
                                        onChange={e => setNewFlight({ ...newFlight, basePrice: e.target.value })}
                                        required
                                        min="0"
                                    />
                                </div>
                                <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem' }}>
                                    Create Flight
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            {/* Add User Modal */}
            {showAddUserModal && (
                <div className="modal active">
                    <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}></div>
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowAddUserModal(false)}>×</button>
                        <h2>Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={newUser.username}
                                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                    required
                                    minLength="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={newUser.userType}
                                    onChange={e => setNewUser({ ...newUser, userType: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary btn-block" style={{ marginTop: '1rem' }}>
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
