import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFlights } from '../services/api';
import FlightCard from '../components/FlightCard';
import BookingModal from '../components/BookingModal';
import { Filter } from 'lucide-react';

const Flights = () => {
    const [searchParams] = useSearchParams();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [priceFilter, setPriceFilter] = useState(50000);
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [availableAirlines, setAvailableAirlines] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            try {
                const params = Object.fromEntries(searchParams.entries());
                const data = await searchFlights(params);
                const flightData = data.data || [];
                setFlights(flightData);

                // Extract unique airlines
                const airlines = [...new Set(flightData.map(f => f.airline))];
                setAvailableAirlines(airlines);
                setSelectedAirlines(airlines); // Select all by default
            } catch (error) {
                console.error('Error fetching flights:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [searchParams]);

    const handleBook = (flight) => {
        setSelectedFlight(flight);
        setIsBookingModalOpen(true);
    };

    const handleAirlineChange = (airline) => {
        setSelectedAirlines(prev => {
            if (prev.includes(airline)) {
                return prev.filter(a => a !== airline);
            } else {
                return [...prev, airline];
            }
        });
    };

    const filteredFlights = flights.filter(flight => {
        const economyClass = flight.classes.find(c => c.className === 'economy');
        const matchesPrice = economyClass ? economyClass.price <= priceFilter : false;
        const matchesAirline = selectedAirlines.includes(flight.airline);
        return matchesPrice && matchesAirline;
    });

    return (
        <div className="container page active">
            <div className="page-header">
                <h1>Flight Results</h1>
                <p>Found {filteredFlights.length} flights for your trip</p>
            </div>

            <div className="flights-container">
                <aside className="flights-filters">
                    <div className="filter-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Filter size={20} />
                        <h3>Filters</h3>
                    </div>

                    <div className="filter-group">
                        <label>Price Range</label>
                        <div className="price-range">
                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                            />
                            <span>Up to ₹{priceFilter.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Airlines</label>
                        <div className="checkbox-group">
                            {availableAirlines.map(airline => (
                                <label key={airline}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAirlines.includes(airline)}
                                        onChange={() => handleAirlineChange(airline)}
                                    />
                                    {airline}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="flights-list">
                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Searching for best flights...</p>
                        </div>
                    ) : filteredFlights.length > 0 ? (
                        filteredFlights.map(flight => (
                            <FlightCard key={flight._id} flight={flight} onBook={handleBook} />
                        ))
                    ) : (
                        <div className="empty-state">
                            <h3>No flights found</h3>
                            <p>Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>

            <BookingModal
                flight={selectedFlight}
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSuccess={() => {
                    // Show success message or redirect
                    alert('Booking Successful!');
                }}
            />
        </div>
    );
};

export default Flights;
