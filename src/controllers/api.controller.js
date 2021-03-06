const axios = require('axios').default

const getRecipes = async (_, res) => {
    try {
        const axiosRes = await axios.get(process.env.HOST_MS_KITCHEN + "/api/recipes")
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error('error getRecipes')
        return res.status(500).json([])
    }
}

const getRecipe = async ({ params }, res) => {
    const { id } = params

    try {
        const axiosRes = await axios.get(process.env.HOST_MS_KITCHEN + "/api/recipes/" + id)
        return res.status(200).json(axiosRes.data ?? null)
    } catch (err) {
        console.error('error getRecipe')
        return res.status(500).json(null)
    }
}

const getIngredients = async (_, res) => {
    try {
        const axiosRes = await axios.get(process.env.HOST_MS_WAREHOUSE + "/api/ingredients")
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error('error getIngredients');
        return res.status(500).json([])
    }
}

const getRecipesHistory = async ({ query }, res) => {
    let { page = 0, limit = 10 } = query

    page = isNaN(page) ? 0 : page
    limit = isNaN(limit) ? 10 : limit

    try {
        const axiosRes = await axios.get(
            process.env.HOST_MS_KITCHEN + `/api/history/recipes?page=${page}&limit=${limit}`
        )
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error('error getRecipesHistory')
        return res.status(500).json([])
    }
}

const getMarketHistory = async ({ query }, res) => {
    let { page = 0, limit = 10 } = query

    page = isNaN(page) ? 0 : page
    limit = isNaN(limit) ? 10 : limit

    try {
        const axiosRes = await axios.get(
            process.env.HOST_MS_WAREHOUSE + `/api/history/market?page=${page}&limit=${limit}`
        )
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error('error getMarketHistory')
        return res.status(500).json([])
    }
}

module.exports = {
    getRecipe,
    getRecipes,
    getIngredients,
    getMarketHistory,
    getRecipesHistory,
}