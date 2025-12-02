const mongoose = require('mongoose');
const User = require('../models/Users/UserSchema');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const listUsers = async () => {
    await connectDB();
    const users = await User.find({});
    console.log('--- USERS ---');
    users.forEach(user => {
        console.log(`${user.name} (${user.email}) - Admin: ${user.isAdmin}`);
    });
    console.log('-------------');
    process.exit();
};

const makeAdmin = async (email) => {
    await connectDB();
    const user = await User.findOne({ email });
    if (user) {
        user.isAdmin = true;
        await user.save();
        console.log(`User ${user.name} (${user.email}) is now an Admin.`);
    } else {
        console.log(`User with email ${email} not found.`);
    }
    process.exit();
};

const command = process.argv[2];
const arg = process.argv[3];

if (command === 'list') {
    listUsers();
} else if (command === 'make-admin') {
    if (!arg) {
        console.log('Please provide an email.');
        process.exit(1);
    }
    makeAdmin(arg);
} else {
    console.log('Usage: node adminUtils.js [list | make-admin <email>]');
    process.exit(1);
}
