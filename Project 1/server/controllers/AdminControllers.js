const Admin = require('../models/Admin/AdminSchema');
const User = require('../models/Users/UserSchema');
const Seller = require('../models/Seller/SellerSchema');
const Book = require('../models/Seller/BookSchema');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            // Generate token (omitted for brevity, assume authMiddleware handles it or we return it here)
            // For now, returning simple success
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Sellers
const getSellers = async (req, res) => {
    try {
        const sellers = await Seller.find({});
        res.json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Seller
const deleteSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (seller) {
            await seller.deleteOne();
            res.json({ message: 'Seller removed' });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Book (Admin)
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed by Admin' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User By ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
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
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create User
const createUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Seller By ID
const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id).select('-password');
        if (seller) {
            res.json(seller);
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Seller
const updateSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (seller) {
            seller.name = req.body.name || seller.name;
            seller.email = req.body.email || seller.email;

            const updatedSeller = await seller.save();
            res.json({
                _id: updatedSeller._id,
                name: updatedSeller.name,
                email: updatedSeller.email,
            });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Seller
const createSeller = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const sellerExists = await Seller.findOne({ email });
        if (sellerExists) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const seller = await Seller.create({
            name,
            email,
            password: hashedPassword
        });
        if (seller) {
            res.status(201).json({
                _id: seller._id,
                name: seller.name,
                email: seller.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid seller data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve Seller
const approveSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (seller) {
            seller.isApproved = true;
            await seller.save();
            res.json({ message: 'Seller approved' });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User Rating
const updateUserRating = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.rating = req.body.rating;
            await user.save();
            res.json({ message: 'User rating updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Seller Rating
const updateSellerRating = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (seller) {
            seller.rating = req.body.rating;
            await seller.save();
            res.json({ message: 'Seller rating updated' });
        } else {
            res.status(404).json({ message: 'Seller not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order to Paid
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id || 'admin_manual',
                status: 'COMPLETED',
                update_time: String(Date.now()),
                email_address: req.body.email_address || 'admin@example.com',
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order to Delivered
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Dashboard Stats
const getDashboardStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const sellersCount = await Seller.countDocuments();
        const booksCount = await Book.countDocuments();
        const ordersCount = await Order.countDocuments();

        res.json({
            users: usersCount,
            sellers: sellersCount,
            books: booksCount,
            orders: ordersCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin, getUsers, getSellers, deleteUser, deleteSeller, deleteBook, getUserById, updateUser, createUser, getSellerById, updateSeller, createSeller, getAllOrders, approveSeller, updateUserRating, updateSellerRating, updateOrderToPaid, updateOrderToDelivered, getDashboardStats };
