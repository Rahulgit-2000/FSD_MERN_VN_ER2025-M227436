const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Seller/BookSchema');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const updateStock = async () => {
    try {
        await connectDB();

        const result = await Book.updateMany(
            {}, // Filter: all books
            { $set: { countInStock: 15 } } // Update: set countInStock to 15
        );

        console.log(`Updated ${result.modifiedCount} books (matched ${result.matchedCount})`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

updateStock();
