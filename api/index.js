// Importing required modules
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import UserRoute from './routes/user.route.js'
import AuthRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error connecting to Database:', err);
  });


// Routes
app.use('/api/user', UserRoute);
app.use('/api/auth', AuthRoute);


// Global Error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({success: false, statusCode, message});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})