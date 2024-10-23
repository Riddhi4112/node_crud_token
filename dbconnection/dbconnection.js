const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function () {
    const connectURI = process.env.DATABASE_URL;

    if (!connectURI) {
        console.error('DATABASE_URL is not defined in .env file');
        return;
    }

    try {
        await mongoose.connect(connectURI);
        console.log('Successfully connected to the database...');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};
