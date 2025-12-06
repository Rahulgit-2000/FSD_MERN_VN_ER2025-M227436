import { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking, searchFlights, rescheduleBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [availableFlights, setAvailableFlights] = useState([]);
    const [selectedNewFlight, setSelectedNewFlight] = useState(null);

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const data = await getMyBookings();
            setBookings(data.data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await cancelBooking(bookingId);
                fetchBookings(); // Refresh list
            } catch (error) {
                alert('Failed to cancel booking');
            }
        }
    };

    const handleRescheduleClick = (booking) => {
        setSelectedBooking(booking);
        setNewDate('');
        setAvailableFlights([]);
        setSelectedNewFlight(null);
        setShowRescheduleModal(true);
    };

    const handleSearchFlights = async (e) => {
        e.preventDefault();
        try {
            const data = await searchFlights({
                origin: (selectedBooking.origin || selectedBooking.flight?.origin || '').split('(')[0].trim(),
                destination: (selectedBooking.destination || selectedBooking.flight?.destination || '').split('(')[0].trim(),
                date: newDate
            });
            setAvailableFlights(data.data || []);
        } catch (error) {
            console.error('Error searching flights:', error);
            alert('Failed to search flights');
        }
    };

    const handleConfirmReschedule = async () => {
        if (!selectedNewFlight) return;

        try {
            await rescheduleBooking(selectedBooking._id, {
                newFlightId: selectedNewFlight._id,
                newClass: selectedBooking.seatClass // Keep same class preference
            });
            alert('Booking rescheduled successfully');
            setShowRescheduleModal(false);
            fetchBookings();
        } catch (error) {
            console.error('Reschedule error:', error);
            alert('Failed to reschedule: ' + (error.response?.data?.message || error.message));
        }
    };

    if (!user) {
        return (
            <div className="container page active" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Please login to view your bookings</h2>
            </div>
        );
    }

    return (
        <div className="container page active">
            <div className="page-header">
                <h1>My Bookings</h1>
                <p>Manage your upcoming and past trips</p>
            </div>

            <div className="bookings-list">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading your bookings...</p>
                    </div>
                ) : bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <div>
                                    <p className="booking-id">Booking ID: {booking.bookingId}</p>
                                    <h3 className="booking-route">
                                        {(booking.flight?.origin || booking.origin || '').split(' ')[0]} → {(booking.flight?.destination || booking.destination || '').split(' ')[0]}
                                    </h3>
                                    <p>{new Date(booking.flight?.departureTime || booking.departureTime).toLocaleString()}</p>
                                </div>
                                <span className={`booking-status ${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="booking-details">
                                <div className="booking-detail">
                                    <span className="detail-label">Airline</span>
                                    <span className="detail-value">{booking.flight?.airline || booking.flightName || 'N/A'}</span>
                                </div>
                                <div className="booking-detail">
                                    <span className="detail-label">Passengers</span>
                                    <span className="detail-value">{booking.passengers}</span>
                                </div>
                                <div className="booking-detail">
                                    <span className="detail-label">Total Price</span>
                                    <span className="detail-value">₹{booking.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {booking.status === 'confirmed' && (
                                <div className="booking-actions">
                                    <button
                                        className="btn-secondary"
                                        style={{ marginRight: '0.5rem' }}
                                        onClick={() => handleRescheduleClick(booking)}
                                    >
                                        Change Date
                                    </button>
                                    <button
                                        className="btn-cancel"
                                        onClick={() => handleCancel(booking._id)}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <h3>No bookings found</h3>
                        <p>You haven't booked any flights yet.</p>
                    </div>
                )}
            </div>


            {/* Reschedule Modal */}
            {
                showRescheduleModal && selectedBooking && (
                    <div className="modal active">
                        <div className="modal-overlay" onClick={() => setShowRescheduleModal(false)}></div>
                        <div className="modal-content" style={{ maxWidth: '600px' }}>
                            <button className="modal-close" onClick={() => setShowRescheduleModal(false)}>×</button>
                            <h2>Reschedule Flight</h2>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>
                                Current: {(selectedBooking.flight?.origin || selectedBooking.origin || '').split(' ')[0]} → {(selectedBooking.flight?.destination || selectedBooking.destination || '').split(' ')[0]}
                            </p>

                            <form onSubmit={handleSearchFlights} style={{ marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Select New Date</label>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <input
                                            type="date"
                                            value={newDate}
                                            onChange={e => setNewDate(e.target.value)}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            style={{ flex: 1 }}
                                        />
                                        <button type="submit" className="btn-primary">Search Flights</button>
                                    </div>
                                </div>
                            </form>

                            {availableFlights.length > 0 ? (
                                <div className="flights-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {availableFlights.map(flight => (
                                        <div
                                            key={flight._id}
                                            className={`flight-card ${selectedNewFlight?._id === flight._id ? 'selected' : ''}`}
                                            style={{
                                                padding: '1rem',
                                                border: selectedNewFlight?._id === flight._id ? '2px solid var(--primary)' : '1px solid #e5e7eb',
                                                borderRadius: '0.5rem',
                                                marginBottom: '0.5rem',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setSelectedNewFlight(flight)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{flight.airline}</div>
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                                                        {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                        {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                                <div style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                                    ₹{flight.classes.find(c => c.className === selectedBooking.seatClass)?.price.toLocaleString() || flight.basePrice.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : newDate && (
                                <p style={{ textAlign: 'center', color: 'var(--text-gray)' }}>No flights found for this date.</p>
                            )}

                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button className="btn-secondary" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
                                <button
                                    className="btn-primary"
                                    onClick={handleConfirmReschedule}
                                    disabled={!selectedNewFlight}
                                >
                                    Confirm Reschedule
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Bookings;
