const { Router } = require('express')

const apiController = require('./controllers/api.controller')

const router = Router()

router
    .get('/recipes', apiController.getRecipes)
    .get('/recipes/:id', apiController.getRecipe)
    .get('/history/market', apiController.getMarketHistory)
    .get('/history/recipes', apiController.getRecipesHistory)

module.exports = router