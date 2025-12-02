import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('/api/user/books');
                setBooks(data);
                setFilteredBooks(data);

                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(book => book.genre))];
                setCategories(uniqueCategories);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
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

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                await axios.delete(`/api/admin/book/${id}`, config);
                const updatedBooks = books.filter((b) => b._id !== id);
                setBooks(updatedBooks);
                // Filtered books will update automatically via useEffect
            } catch (error) {
                alert('Error deleting book');
            }
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="container">
            <div className="section-header">
                <h1 className="page-title">Manage Books</h1>
            </div>

            <div className="filter-container" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: 1 }}
                />
                <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ width: '200px' }}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <img src={book.itemImage || book.image} alt={book.title} className="product-thumb" />
                                </td>
                                <td>{book.title}</td>
                                <td>{book.genre}</td>
                                <td>${book.price}</td>
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => deleteHandler(book._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBooks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                        No books found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;
