const { Model, DataTypes } = require('sequelize')

const sequelize = require('../settings/sequelize')

class Ingredient extends Model { }

Ingredient.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER(10),
    },
    name: {
        unique: true,
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    stock: {
        defaultValue: 5,
        type: DataTypes.INTEGER,
    },

    minimumStock: {
        defaultValue: 10,
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
})

module.exports = { Ingredient }