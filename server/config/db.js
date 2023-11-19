const mongoose = require("mongoose");
require('dotenv').config();

// const dbUrl = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
 
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

module.exports = connectDb;