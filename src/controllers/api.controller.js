const axios = require('axios').default

const getRecipes = async (_, res) => {
    try {
        const axiosRes = await axios.get(process.env.HOST_MS_KITCHEN + "/api/recipes")
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

const getRecipe = async ({ params }, res) => {
    const { id } = params

    try {
        const axiosRes = await axios.get(process.env.HOST_MS_KITCHEN + "/api/recipes/" + id)
        return res.status(200).json(axiosRes.data ?? null)
    } catch (err) {
        console.error(err)
        return res.status(500).json(null)
    }
}

const getRecipesHistory = async ({ query }, res) => {
    let { page = 0, limit = 10 } = query

    page = isNaN(page) ? 0 : page
    limit = isNaN(limit) ? 10 : limit

    try {
        const axiosRes = await axios.get(
            process.env.HOST_MS_WAREHOUSE + `/api/history/recipes?page=${page}&limit=${limit}`
        )
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

const getMarketHistory = async ({ query }, res) => {
    let { page = 0, limit = 10 } = query

    page = isNaN(page) ? 0 : page
    limit = isNaN(limit) ? 10 : limit

    try {
        const axiosRes = await axios.get(
            process.env.HOST_MS_WAREHOUSE + `/api/history/ingredients?page=${page}&limit=${limit}`
        )
        return res.status(200).json(axiosRes.data ?? [])
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

module.exports = {
    getRecipe,
    getRecipes,
    getMarketHistory,
    getRecipesHistory,
}