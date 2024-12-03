const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const DB_URI = process.env.DB_URI;
 
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
