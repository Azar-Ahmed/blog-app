import User from "../models/user.model.js";
import {errorHandler} from '../utils/error.utils.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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


export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  //  Validation
  if (!email || !password) {
    next(errorHandler(400, "All fields are required!"))
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
     return next(errorHandler(400, "User not found!"))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){ 
      return next(errorHandler(400, "Invalid password"));
    }
    
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

    const {password: pass, ...rest} = validUser._doc;  
    res.status(200).cookie('access_token',token, {
      httpOnly: true
    }).json(rest); 

  } catch (error) {
    next(error)
  }
}