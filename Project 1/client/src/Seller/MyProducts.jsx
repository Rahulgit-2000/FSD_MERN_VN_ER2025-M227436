import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react';
import './List.css';

const MyProducts = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
            const config = { headers: { Authorization: `Bearer ${sellerInfo.token}` } };
            const { data } = await axios.get('/api/seller/my-books', config);
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
                const config = { headers: { Authorization: `Bearer ${sellerInfo.token}` } };
                await axios.delete(`/api/seller/delete-book/${id}`, config);
                setBooks(books.filter(book => book._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                alert(error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            <div className="container">
                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>My Products</h2>
                    <Link to="/seller/add-book" className="btn btn-primary">
                        <Plus size={20} style={{ marginRight: '0.5rem' }} />
                        Add New Product
                    </Link>
                </div>

                {books.length === 0 ? (
                    <div className="cart-empty-state">
                        <p>You haven't added any products yet.</p>
                        <Link to="/seller/add-book" className="btn btn-primary">Add Your First Book</Link>
                    </div>
                ) : (
                    <div className="books-grid">
                        {books.map(book => (
                            <div key={book._id} className="card book-card">
                                <img src={book.image || book.itemImage} alt={book.title} className="book-image" />
                                <div className="book-info">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-author">{book.author}</p>
                                    <div className="book-price-row">
                                        <span className="book-price">${book.price}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Link to={`/seller/update-book/${book._id}`} className="btn btn-sm btn-outline">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-outline"
                                                style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
                                                onClick={() => deleteHandler(book._id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
