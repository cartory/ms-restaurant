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
        // await sequelize.sync({ logging: true })

        // const [recipesDB, ingredientsDB] = await Promise.all([
        //     Recipe.bulkCreate(recipesJSON),
        //     Ingredient.bulkCreate(ingredientsJSON),
        // ])

        const [recipesDB, ingredientsDB] = await Promise.all([
            Recipe.findAll(recipesJSON),
            Ingredient.findAll(ingredientsJSON),
        ])

        const recipeIngredients = []

        recipesJSON.forEach(r => {
            const recipe = recipesDB.find(rdb => r.name === rdb.getDataValue("name"))
            r.ingredients.forEach(async i => {
                const ingredient = ingredientsDB.find(idb => idb.getDataValue("name") === i.name)
                recipeIngredients.push({
                    count: i.count,
                    RecipeId: recipe.getDataValue('id'),
                    IngredientId: ingredient.getDataValue('id'),
                })
            })
        })

        await RecipeIngredient.bulkCreate(recipeIngredients)

        console.log("sync done");
    })
    .catch(e => console.error(e))
