// Importing required modules
import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Set the port for Express app
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})