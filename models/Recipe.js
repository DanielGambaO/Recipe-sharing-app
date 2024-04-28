const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "dessert"],
    required: true,
  },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [{ type: Number, min: 1, max: 5 }],
  comments: [
    { text: String, postedBy: { type: Schema.Types.ObjectId, ref: "User" } },
  ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
