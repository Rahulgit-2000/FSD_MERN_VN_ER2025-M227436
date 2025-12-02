import React from 'react';
import { Link } from 'react-router-dom';
import './uhome.css'; // Assuming you might have styles

const Uhome = () => {
    return (
        <div className="uhome-container">
            <h1>Welcome to BookStore</h1>
            <p>Find your favorite books here.</p>
            <Link to="/products" className="btn btn-primary">Browse Books</Link>
        </div>
    );
};

export default Uhome;
