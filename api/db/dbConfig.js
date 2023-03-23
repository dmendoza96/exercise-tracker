const {Sequelize} = require('sequelize');

const db = new Sequelize('exercise-tracker', 'user', 'pass', {
    dialect: 'sqlite',
    host: './exercise-tracker.sqlite'
})

module.exports = db;