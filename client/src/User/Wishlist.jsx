import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    const removeFromWishlistHandler = async (id) => {
        removeFromWishlist(id);
    };

    const addToCartHandler = (book) => {
        addToCart({
            product: book._id,
            name: book.title,
            image: book.image,
            price: book.price,
            countInStock: book.countInStock,
            qty: 1
        });
        alert('Added to cart!');
    };

    if (!user) return <div className="container">Please login to view wishlist</div>;


    return (
        <div className="container wishlist-page">
            <h1 className="page-title">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <div className="cart-empty-state">
                    <Heart size={64} className="empty-cart-icon" />
                    <h2>Your wishlist is empty</h2>
                    <Link to="/" className="btn btn-primary">Browse Books</Link>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((book) => (
                        <div key={book._id} className="card book-card">
                            <Link to={`/book/${book._id}`}>
                                <img src={book.image} alt={book.title} className="book-image" />
                            </Link>
                            <div className="book-info">
                                <Link to={`/book/${book._id}`}>
                                    <h3 className="book-title">{book.title}</h3>
                                </Link>
                                <p className="book-author">by {book.author}</p>
                                <div className="book-price-row">
                                    <span className="book-price">${book.price}</span>
                                    <div className="wishlist-actions">
                                        <button
                                            onClick={() => addToCartHandler(book)}
                                            className="btn btn-sm btn-primary"
                                            title="Add to Cart"
                                            style={{ gap: '0.5rem' }}
                                        >
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlistHandler(book._id)}
                                            className="btn-icon delete-btn"
                                            title="Remove"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
