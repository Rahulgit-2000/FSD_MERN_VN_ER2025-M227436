import React from 'react';

const Book = ({ book }) => {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {/* Display other details */}
        </div>
    );
};

export default Book;
