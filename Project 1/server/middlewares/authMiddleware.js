const jwt = require('jsonwebtoken');
const User = require('../models/Users/UserSchema');
const Admin = require('../models/Admin/AdminSchema');
const Seller = require('../models/Seller/SellerSchema');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Try to find user in all roles
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                req.user = await Admin.findById(decoded.id).select('-password');
            }
            if (!req.user) {
                req.user = await Seller.findById(decoded.id).select('-password');
            }

            if (!req.user) {
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    // Check if user exists and if they are an admin (either via isAdmin flag or being in Admin collection)
    // Since we have a separate Admin model, we might check if req.user is an instance of Admin
    // For now, let's assume if they were found in the Admin collection, they are an admin.
    // We can add a 'role' property to the user object attached to req.

    // Simple check: if the user was found in Admin collection (we'd need to know that)
    // OR if the user object has an isAdmin property (legacy)
    if (req.user && (req.user.isAdmin || req.user.constructor.modelName === 'Admin')) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
