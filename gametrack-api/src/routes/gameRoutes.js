const express = require('express')

const {
    getGames,
    createGame,
    deleteGame,
    updateGame
} = require('../controllers/gameController')

const router = express.Router()

router.get('/', getGames)
router.post('/', createGame)
router.delete('/:id', deleteGame)
router.put('/:id', updateGame)
module.exports = router