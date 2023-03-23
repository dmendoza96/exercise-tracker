const {DataTypes} = require('sequelize');
const validDate = require('../helpers/validDate')
const db = require('../db/dbConfig')

const Exercise = db.define('Exercise', {
    usernameId: {
        type: DataTypes.NUMBER
    },
    duration: {
        type: DataTypes.NUMBER
    },
    description: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    }
},{
    timestamps: false
}
);

module.exports = Exercise