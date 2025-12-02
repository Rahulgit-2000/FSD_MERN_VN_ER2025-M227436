const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, default: 0 },
    location: String,
    condition: String
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
