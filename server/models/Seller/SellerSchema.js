const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isApproved: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
