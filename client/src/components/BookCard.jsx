import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation to book details if clicking button
        if (!user) {
            alert('Please login or register to purchase and add to cart');
            navigate('/login');
            return;
        }
        addToCart({
            product: book._id,
            name: book.title,
            image: book.image || book.itemImage,
            price: book.price,
            countInStock: book.countInStock,
            qty: 1
        });
        alert('Book added to cart!');
    };

    return (
        <div className="card book-card">
            <div style={{ position: 'relative' }}>
                <Link to={`/book/${book._id}`}>
                    <img src={book.image || book.itemImage} alt={book.title} className="book-image" />
                </Link>
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
            <div className="book-info">
                <Link to={`/book/${book._id}`}>
                    <h3 className="book-title">{book.title}</h3>
                </Link>
                <p className="book-author">by {book.author}</p>

                <div className="book-rating">
                    <span className="rating-value">{book.rating}</span>
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span className="review-count">({book.numReviews})</span>
                </div>

                <div className="book-price-row">
                    <span className="book-price">${book.price}</span>
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={handleAddToCart}
                        disabled={book.countInStock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
