const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const {
    getGames,
    createGame,
    deleteGame,
    updateGame,
    getGameById
} = require('../controllers/gameController')

const router = express.Router()

router.get('/',authMiddleware, getGames)
router.post('/', authMiddleware, createGame)
router.delete('/:id', authMiddleware, deleteGame)
router.put('/:id', authMiddleware, updateGame)
router.get('/:id', authMiddleware, getGameById)
module.exports = router