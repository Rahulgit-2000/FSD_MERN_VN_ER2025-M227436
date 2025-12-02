import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Search, X, Filter } from 'lucide-react';
import API_URL from '../apiConfig';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_URL}/api/user/books`);
            setBooks(data);
            setFilteredBooks(data);

            // Extract unique categories
            const uniqueCategories = ['All', ...new Set(data.map(book => book.genre))];
            setCategories(uniqueCategories);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        let result = books;

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(book => book.genre === selectedCategory);
        }

        // Filter by Search (First letter matching or general search)
        if (keyword) {
            const query = keyword.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().startsWith(query) ||
                book.title.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(result);
    }, [keyword, selectedCategory, books]);

    const clearSearch = () => {
        setKeyword('');
        setSelectedCategory('All');
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="container hero-content">
                    <h1>Discover Your Next Favorite Book</h1>
                    <p>Explore our vast collection of bestsellers, classics, and hidden gems.</p>

                    <div className="search-filter-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div className="search-bar" style={{ flex: 2, minWidth: '300px' }}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword && (
                                <button
                                    type="button"
                                    className="clear-btn"
                                    onClick={() => setKeyword('')}
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div className="category-filter" style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                            <Filter className="input-icon" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', zIndex: 1 }} />
                            <select
                                className="form-control"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    paddingLeft: '3rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    appearance: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
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
                    <>
                        <div className="books-grid">
                            {filteredBooks.map((book) => (
                                <BookCard key={book._id} book={book} />
                            ))}
                        </div>
                        {filteredBooks.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                                <h3>No books found matching your criteria</h3>
                                <button
                                    onClick={clearSearch}
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
