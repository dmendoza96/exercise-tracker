const {DataTypes} = require('sequelize');
const db = require('../db/dbConfig')

const User = db.define('User', {
    username: {
        type: DataTypes.TEXT
    },
},{
    timestamps: false
});

module.exports = User