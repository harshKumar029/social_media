const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign Up
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully", username: user.username });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body; // Use username for login
    console.log(username, password);
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      console.log("console.log(user)", user);
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      console.log("isMatch", isMatch);
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("token", token);
  
      // Include user ID in the response
      res.json({
        token,
        userId: user._id,
        username: user.username, // Optional: Send the username for convenience
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { signUp, login };
