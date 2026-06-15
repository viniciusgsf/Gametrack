const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const {
    getGames,
    createGame,
    deleteGame,
    updateGame
} = require('../controllers/gameController')

const router = express.Router()

router.get('/',authMiddleware, getGames)
router.post('/', authMiddleware, createGame)
router.delete('/:id', authMiddleware, deleteGame)
router.put('/:id', authMiddleware, updateGame)
module.exports = router