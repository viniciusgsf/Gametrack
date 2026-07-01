const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getMe, changePassword, updateAvatar } = require('../controllers/userController')

const router = express.Router()

router.get('/me', authMiddleware, getMe)
router.put('/password', authMiddleware, changePassword)
router.put(
    '/avatar',
    authMiddleware,
    updateAvatar
)

module.exports = router