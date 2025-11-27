const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (user.password === password)) { // Note: In production, use bcrypt to compare hashes
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password, // Note: In production, hash this password before saving
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (user) {
        res.json(user.wishlist);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Add to wishlist
// @route   POST /api/users/wishlist/:id
// @access  Private
const addToWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    const bookId = req.params.id;

    if (user) {
        if (user.wishlist.includes(bookId)) {
            res.status(400).json({ message: 'Book already in wishlist' });
        } else {
            user.wishlist.push(bookId);
            await user.save();
            res.json({ message: 'Book added to wishlist' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    const bookId = req.params.id;

    if (user) {
        user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
        await user.save();
        res.json({ message: 'Book removed from wishlist' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private
const getCart = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (user) {
        // Transform to match frontend structure if needed, or just return cart
        // Frontend expects: { product, name, image, price, countInStock, qty }
        // Backend stores: { product: Object, qty }
        // We need to map it
        const cartItems = user.cart.map(item => ({
            product: item.product._id,
            name: item.product.title,
            image: item.product.image,
            price: item.product.price,
            countInStock: item.product.countInStock,
            qty: item.qty
        }));
        res.json(cartItems);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user cart
// @route   PUT /api/users/cart
// @access  Private
const updateCart = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        // Expecting array of items from frontend
        // Need to map back to schema structure: { product: ID, qty }
        const cartItems = req.body.map(item => ({
            product: item.product,
            qty: item.qty
        }));
        user.cart = cartItems;
        await user.save();
        res.json(user.cart);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    getCart,
    updateCart,
    createUser
};
