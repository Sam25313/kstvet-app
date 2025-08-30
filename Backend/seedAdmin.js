const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User')
require('dotenv').config();

const createAdminUser = async () => {
    try {
        const uri = process.env.MONGO_URI; 
        if (!uri) {
            throw new Error('MONGO_URI must be defined in your .env file.');
        }

        await mongoose.connect(uri);
        console.log('Connected to MongoDB.');

        const username = process.env.USER_NAME
        const password = process.env.USER_PASSWORD

        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user document
        const newAdmin = new User({
            username: username,
            password: hashedPassword,
            role: 'admin',
            fullName: 'Admin User',
        });

        await newAdmin.save();
        console.log('Admin user created successfully:', newAdmin);

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.disconnect();
    }
};

createAdminUser();