const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    readingProgress: Number,
    review: String,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);
