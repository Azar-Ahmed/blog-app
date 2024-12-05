// Importing required modules
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import UserRoute from './routes/user.route.js'
import AuthRoute from './routes/auth.route.js'

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

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


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})