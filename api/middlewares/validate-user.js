const User = require("../models/User")

const validateUser = async(req, res, next) => {

    const userExist = await User.findByPk(req.params.userId)

    if(!userExist){
        return res.status(400).json({
            message: 'The user does not exist. Please enter a valid Id'
        })
    }

    next()
}

module.exports = validateUser