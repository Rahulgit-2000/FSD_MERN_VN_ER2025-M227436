const mongoose = require('mongoose');

const categorizedAsSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    // Ideally this would ref a Genre model
    genreName: String
}, { timestamps: true });

module.exports = mongoose.model('CategorizedAs', categorizedAsSchema);
