const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            qty: { type: Number, default: 1 }
        }
    ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    isAdmin: { type: Boolean, required: true, default: false },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
