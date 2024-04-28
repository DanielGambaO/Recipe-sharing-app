const Recipe = require('../models/Recipe');

const recipeController = {


  //create recipe
  


  createRecipe: async (req, res) => {
    try {
      const newRecipe = new Recipe(req.body);
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(400).json({ message: 'we could not create your recipe.. maybe you did something wrong?' });
    }
  },



  //retrieve all recipes

  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json({ message: 'we could not retrieve all the recipes somehow... maybe you did something wrong?' });
    }
  },




  //retrieve recipe by ID

  getRecipeById: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'we could not find the recipe' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ message: 'something went wrong...' });
    }
  },




  //update recipe
  
  updateRecipe: async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'we could not find the recipe' });
      }
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(400).json({ message: 'wow, thats weird. we could not update the recipe... what happened?' });
    }
  },



  //delete a recipe
  deleteRecipe: async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'we could not find the recipe' });
      }
      res.status(200).json({ message: 'nice! this recipe will never be seen again... ' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = recipeController;
