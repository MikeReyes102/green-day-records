const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const dotenv = require('dotenv'); // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect using the MONGO_URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error and exit process if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; // Export the connectDB function