const User = require('../models/Users/UserSchema');
const Book = require('../models/Seller/BookSchema');
const MyOrder = require('../models/Users/MyOrders');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Books (Public)
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Book By ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Place Order
const placeOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        // Check stock and decrement
        for (const item of orderItems) {
            const book = await Book.findById(item.product);
            if (!book) {
                return res.status(404).json({ message: `Book not found: ${item.name}` });
            }
            if (book.countInStock < item.qty) {
                return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
            }
            book.countInStock -= item.qty;
            await book.save();
        }

        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: paymentMethod === 'Credit Card',
            paidAt: paymentMethod === 'Credit Card' ? Date.now() : null,
            paymentResult: paymentMethod === 'Credit Card' ? {
                id: 'dummy_id_' + Date.now(),
                status: 'COMPLETED',
                update_time: String(Date.now()),
                email_address: req.user.email
            } : (paymentMethod === 'Cash on Delivery' ? {
                status: 'Pending Payment (COD)'
            } : {})
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// Get My Orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Cart
const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Cart
const updateCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.cart = req.body;
            await user.save();
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Wishlist
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add to Wishlist
const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const bookId = req.params.id;
        if (user.wishlist.includes(bookId)) {
            return res.status(400).json({ message: 'Book already in wishlist' });
        }
        user.wishlist.push(bookId);
        await user.save();
        res.json({ message: 'Added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const bookId = req.params.id;
        user.wishlist = user.wishlist.filter(id => id.toString() !== bookId);
        await user.save();
        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Book Review
const createBookReview = async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            // Initialize reviews if undefined (for existing documents)
            if (!book.reviews) {
                book.reviews = [];
            }

            const alreadyReviewed = book.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            book.reviews.push(review);
            book.numReviews = book.reviews.length;
            book.rating =
                book.reviews.reduce((acc, item) => item.rating + acc, 0) /
                book.reviews.length;

            await book.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getBooks, getBookById, placeOrder, getMyOrders, getCart, updateCart, getWishlist, addToWishlist, removeFromWishlist, createBookReview, updateUserProfile };
