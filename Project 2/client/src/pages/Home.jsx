import { useNavigate } from 'react-router-dom';
import FlightSearchForm from '../components/FlightSearchForm';
import { Shield, Clock, Globe } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const handleSearch = (params) => {
        // Navigate to flights page with search params
        const searchString = new URLSearchParams(params).toString();
        navigate(`/flights?${searchString}`);
    };

    return (
        <div className="home-page">
            <div className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your Journey Begins Here
                    </h1>
                    <p className="hero-subtitle">
                        Book flights instantly. Compare fares. Travel seamlessly.
                    </p>
                </div>
            </div>

            <div className="container">
                <FlightSearchForm onSearch={handleSearch} />

                <section className="features-section">
                    <h2 className="section-title">Why Fly With Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Shield />
                            </div>
                            <h3>Secure Booking</h3>
                            <p>Your payments and personal data are protected with bank-grade security.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Clock />
                            </div>
                            <h3>Fast & Easy</h3>
                            <p>Book your flight in just a few clicks with our intuitive interface.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Globe />
                            </div>
                            <h3>Global Coverage</h3>
                            <p>Access flights to over 500+ destinations worldwide.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
