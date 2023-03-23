const {Router} = require('express')
const {postUser, getUsers, postUserExercise, getUserLogs} = require('../controllers/users')
const validateUser = require('../middlewares/validate-user')

const router = Router();

router.post('/', postUser)
router.get('/', getUsers )
router.post('/:userId?/exercises', validateUser, postUserExercise)
router.get('/:userId?/logs', validateUser, getUserLogs )


module.exports = router 