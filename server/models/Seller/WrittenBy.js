const mongoose = require('mongoose');

const writtenBySchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    // Ideally this would ref an Author model, but for now we'll store the name or ID if we create an Author model later
    authorName: String
}, { timestamps: true });

module.exports = mongoose.model('WrittenBy', writtenBySchema);
