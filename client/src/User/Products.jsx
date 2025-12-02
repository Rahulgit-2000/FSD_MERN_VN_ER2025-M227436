import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const Products = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('/api/user/books');
                setBooks(data);
                setFilteredBooks(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(book => book.genre))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        let result = books;

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(book => book.genre === selectedCategory);
        }

        // Filter by Search (First letter matching or general search)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(book =>
                book.title.toLowerCase().startsWith(query) ||
                book.title.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(result);
    }, [searchQuery, selectedCategory, books]);

    return (
        <div className="container">
            <div className="section-header">
                <h1 className="page-title">All Books</h1>
            </div>

            <div className="filter-container" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="search-wrapper" style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search className="input-icon" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>

                <div className="category-wrapper" style={{ position: 'relative', minWidth: '200px' }}>
                    <Filter className="input-icon" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ paddingLeft: '3rem', appearance: 'none' }}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                {filteredBooks.map(book => (
                    <div key={book._id} className="product-card" style={{ border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden', transition: 'transform 0.2s' }}>
                        <Link to={`/book/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img src={book.itemImage || book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {book.isPopular && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: '#ff4081',
                                        color: 'white',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        zIndex: 1
                                    }}>
                                        Popular
                                    </span>
                                )}
                            </div>
                            <div className="product-info" style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{book.author}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${book.price}</span>
                                    <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--background)', borderRadius: '1rem' }}>{book.genre}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {filteredBooks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                    No books found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default Products;
