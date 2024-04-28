const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();

      res.json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.json({ message: "Invalid username or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.json({ message: "Invalid username or password" });
      }

      res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.json({ message: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error logging out:", err);
          res.json({ message: "Failed to logout" });
        } else {
          res.json({ message: "Logout successful" });
        }
      });
    } catch (error) {
      console.error("Error logging out:", error);
      res.json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
