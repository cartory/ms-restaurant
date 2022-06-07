require('dotenv').config()

const recipesJSON = require('./jsons/recipes.json')
const ingredientsJSON = require('./jsons/ingredients.json')

const sequelize = require('./settings/sequelize')
const {
    Recipe,
    Request,
    Ingredient,
    RecipeIngredient,
} = require('./settings/models')

sequelize
    .authenticate()
    .then(async () => {
        await sequelize.sync({ force: true, logging: true })

        const ingredientsDB = await Ingredient.bulkCreate(ingredientsJSON)

        recipesJSON.forEach(async ({ name, imageURL, ingredients = [] }) => {
            const recipe = await Recipe.create({ name, imageURL })

            ingredients.forEach(async ({ name, count }) => {
                const ingredient = ingredientsDB.find(i => {
                    return i.getDataValue('name') === name
                })

                await RecipeIngredient.create({
                    count,
                    RecipeId: recipe.getDataValue('id'),
                    IngredientId: ingredient.getDataValue('id'),
                })
            })
        })
        
        console.log("sync done");
    })
    .catch(e => console.error(e))
