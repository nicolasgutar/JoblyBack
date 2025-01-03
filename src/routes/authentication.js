const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    getUserById,
    updateUser,
    getUserCount
} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/count', getUserCount)
router.get('/:id', getUserById)
router.patch('/:id', updateUser)

module.exports = router