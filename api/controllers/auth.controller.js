import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  //  Validation
  if (!username || !email || !password) {
    return res.status(400).json({error: "All fields are required!"})
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
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
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
