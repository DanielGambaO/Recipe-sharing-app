const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Define your routes for CRUD operations on recipes, ratings, and comments

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
