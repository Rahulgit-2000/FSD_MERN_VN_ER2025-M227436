const Seller = require('../models/Seller/SellerSchema');
const Book = require('../models/Seller/BookSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Seller
const registerSeller = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const sellerExists = await Seller.findOne({ email });
        if (sellerExists) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const seller = await Seller.create({ name, email, password: hashedPassword });
        if (seller) {
            res.status(201).json({
                _id: seller._id,
                name: seller.name,
                email: seller.email,
                token: generateToken(seller._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid seller data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Seller
const loginSeller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (seller && (await bcrypt.compare(password, seller.password))) {
            // if (!seller.isApproved) {
            //     return res.status(401).json({ message: 'Account not approved by admin yet.' });
            // }
            res.json({
                _id: seller._id,
                name: seller.name,
                email: seller.email,
                token: generateToken(seller._id)
            });
        } else {
            // Check if it's an admin trying to login
            const User = require('../models/Users/UserSchema');
            const user = await User.findOne({ email });
            if (user && user.isAdmin && (await bcrypt.compare(password, user.password))) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: true,
                    token: generateToken(user._id)
                });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Book
const addBook = async (req, res) => {
    const { title, author, genre, description, price, itemImage, countInStock, isPopular } = req.body;
    try {
        const book = new Book({
            title,
            author,
            genre,
            description,
            price,
            itemImage,
            countInStock,
            isPopular,
            sellerId: req.user._id,
            sellerName: req.user.name
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get My Books
const getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ sellerId: req.user._id });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Book
const updateBook = async (req, res) => {
    const { title, author, genre, description, price, itemImage, countInStock, isPopular } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            if (book.sellerId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this book' });
            }
            book.title = title || book.title;
            book.author = author || book.author;
            book.genre = genre || book.genre;
            book.description = description || book.description;
            book.price = price || book.price;
            book.itemImage = itemImage || book.itemImage;
            book.countInStock = countInStock || book.countInStock;
            book.isPopular = isPopular !== undefined ? isPopular : book.isPopular;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            if (book.sellerId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to delete this book' });
            }
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Seller Orders
const getSellerOrders = async (req, res) => {
    try {
        // 1. Find all books belonging to this seller
        const myBooks = await Book.find({ sellerId: req.user._id }).select('_id');
        const myBookIds = myBooks.map(book => book._id);

        // 2. Find orders that contain any of these books
        const orders = await require('../models/Order').find({
            'orderItems.product': { $in: myBookIds }
        }).populate('user', 'name email').sort({ createdAt: -1 });

        // 3. (Optional) You might want to filter the orderItems in the response 
        // to only show items belonging to this seller, but for now we return the full order
        // or we can map it to a cleaner structure.

        // Let's return the full order but the frontend can highlight/filter relevant items.
        // Or better, let's attach a flag or filtered list.

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Seller Profile
const updateSellerProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.user._id);

        if (seller) {
            seller.name = req.body.name || seller.name;
            seller.email = req.body.email || seller.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                seller.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedSeller = await seller.save();

            res.json({
                _id: updatedSeller._id,
                name: updatedSeller.name,
                email: updatedSeller.email,
                token: generateToken(updatedSeller._id),
            });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Seller Stats
const getSellerStats = async (req, res) => {
    try {
        // 1. Total Products
        const totalProducts = await Book.countDocuments({ sellerId: req.user._id });

        // 2. Total Orders & Earnings
        const myBooks = await Book.find({ sellerId: req.user._id }).select('_id price');
        const myBookIds = myBooks.map(book => book._id);

        // Create a map for quick price lookup
        const bookPriceMap = {};
        myBooks.forEach(book => {
            bookPriceMap[book._id.toString()] = parseFloat(book.price);
        });

        const orders = await require('../models/Order').find({
            'orderItems.product': { $in: myBookIds }
        });

        const totalOrders = orders.length;
        let totalEarnings = 0;

        orders.forEach(order => {
            order.orderItems.forEach(item => {
                if (myBookIds.some(id => id.toString() === item.product.toString())) {
                    // Assuming item has qty, or default to 1 if not present (though schema usually has it)
                    // We use the current book price for simplicity, or item.price if stored in order
                    // Better to use item.price from order if available to capture historical price
                    // But for now let's use the price from our map as a fallback or if order doesn't store it
                    // Actually, OrderSchema usually stores price at time of purchase. 
                    // Let's check if item has price. If not, use current book price.
                    const price = item.price || bookPriceMap[item.product.toString()] || 0;
                    const qty = item.qty || 1;
                    totalEarnings += price * qty;
                }
            });
        });

        res.json({
            totalProducts,
            totalOrders,
            totalEarnings: totalEarnings.toFixed(2)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerSeller, loginSeller, addBook, getMyBooks, updateBook, deleteBook, getSellerOrders, updateSellerProfile, getSellerStats };
