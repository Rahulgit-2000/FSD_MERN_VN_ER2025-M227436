const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const fs = require('fs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        let output = 'MongoDB Connected\n';
        const user = await User.findOne({ email: 'dbtest@example.com' });
        if (user) {
            output += 'User found in database:\n';
            output += `ID: ${user._id}\n`;
            output += `Name: ${user.name}\n`;
            output += `Email: ${user.email}\n`;
            output += `Is Admin: ${user.isAdmin}\n`;
            output += `Created At: ${user.createdAt}\n`;
        } else {
            output += 'User not found in database.\n';
        }
        fs.writeFileSync('verification_result.txt', output);
        process.exit();
    })
    .catch(err => {
        fs.writeFileSync('verification_result.txt', `Error: ${err.message}`);
        process.exit(1);
    });
