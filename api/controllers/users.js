const User = require("../models/User")
const Exercise = require("../models/Exercise")
const { Op } = require('sequelize');
const validateDate = require("../helpers/validDate")

const getUsers = async(req, res) => {

    try {        
        const users = await User.findAll()
    
        res.status(200).json({
            users
        })

    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })
        
    }
    
}

const postUser = async(req, res) => {

    const {username} = req.body

    if(!username){
        return res.status(400).json({
            message: 'Please enter a valid user'
        })
    }
    
    try {

        const userExists = await User.findOne({
            where: {
                username
            }
        })
    
        if(userExists) {
            return res.status(400).json({
                message: 'User already exists, choose other name'
            })
        }

        const user = await User.create({username: username.trim()})
        
        res.status(200).json({
            user
        })


    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
        
    }
}

const postUserExercise = async(req, res) => {

    const {description, duration, date} = req.body

    const errors = []

    if(description.length < 1){
        errors.push({
            field: 'description',
            message: 'Please enter a valid description'
        })
    }


    if(duration.length < 1 || isNaN(duration)){
        errors.push({
            field: 'duration',
            message:" Please enter a valid duration. Duration can't be empty and should be a number "
        })
    }

    if(!validateDate(date) && date !== ''){
        errors.push({
            field: 'date',
            message: 'Please enter the date in the following format YYYY-MM-DD'
        })
    }

    if(errors.length > 0){
        return res.status(400).json({
            errors
        })
    }
    
    try {

        const exercise = await Exercise.create({
            description: description.trim(), 
            duration: duration.trim(), 
            date: date || new Date(), 
            usernameId: req.params.userId 
        })

        res.status(200).json({
            exercise
        })


    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })
    }

}

const getUserLogs = async(req, res) => {

    const {limit, from, to} = req.query;

    try {
        const userLogs = await Exercise.findAll({
            where: {
                usernameId: req.params.userId,
                ...((from && to) && {
                    date: {
                        [Op.gte]: new Date(from),
                        [Op.lte]: new Date(to),
                    }})
            },
            order: [['date', 'ASC']],
            limit: limit || null
        })

        res.status(200).json({
            logs: userLogs,
            count: userLogs.length
        })


    } catch (error) {

        res.status(500).json({
            message: 'Server Error'
        })
    }

}

module.exports = {
    getUsers,
    postUser,
    postUserExercise,
    getUserLogs
}
