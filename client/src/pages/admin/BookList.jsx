import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('/api/books');
                setBooks(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            try {
                await axios.delete(`/api/books/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setBooks(books.filter((b) => b._id !== id));
            } catch (error) {
                alert('Error deleting book');
            }
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
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
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>
                                <img src={book.image} alt={book.title} className="product-thumb" />
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
        </div>
    );
};

export default BookList;
