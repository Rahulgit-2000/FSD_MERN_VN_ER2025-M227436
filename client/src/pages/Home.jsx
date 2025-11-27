import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Search, X } from 'lucide-react';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        // Real-time search handles fetching, so this might not be needed
        // but keeping it to prevent form submission reload
    };

    const fetchBooks = async (searchKeyword = '') => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/books?keyword=${searchKeyword}`);
            setBooks(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="container hero-content">
                    <h1>Discover Your Next Favorite Book</h1>
                    <p>Explore our vast collection of bestsellers, classics, and hidden gems.</p>
                    <form onSubmit={searchHandler} className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                fetchBooks(e.target.value);
                            }}
                        />
                        {keyword && (
                            <button
                                type="button"
                                className="clear-btn"
                                onClick={() => {
                                    setKeyword('');
                                    fetchBooks('');
                                }}
                            >
                                <X size={20} />
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2>Featured Books</h2>
                    <div className="divider"></div>
                </div>

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : error ? (
                    <div className="error-message">Error: {error}</div>
                ) : (
                    <div className="books-grid">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
