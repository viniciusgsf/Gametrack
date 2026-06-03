const prisma = require('../prisma/prisma')

const getGames = async (req, res) => {
    try {
      const games = await prisma.game.findMany()

      res.json(games)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao buscar jogos' })
    }
}

module.exports = {
    getGames
}