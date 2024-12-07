import User from "../models/user.model.js";
import {errorHandler} from '../utils/error.utils.js'
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  //  Validation
  if (!username || !email || !password) {
    next(errorHandler(400, "All fields are required!"))
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(errorHandler(400, "Email is already registered."))
    }

    // Hashed password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Save the user to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({
        message: "User signed up successfully!",
        user: { username, email },
      });
  } catch (error) {
    next(error)
  }
};
