const prisma = require('../prisma/prisma')

const getGames = async (req, res) => {
    try {
      const games = await prisma.game.findMany({
        where: {
          userId: req.user.id
        }
      })

      res.json(games)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao buscar jogos' })
    }
}

const createGame = async (req, res) => {

  try{
    const {
      title,
      genre,
      platform,
      status,
      rating
    } = req.body

    const game = await prisma.game.create({
      data: {
        title,
        genre,
        platform,
        status,
        rating,
        userId: req.user.id
      }
    })

    res.status(201).json(game)

  } catch(error) {
    console.error(error)

    res.status(500).json({
      error: 'Erro ao criar jogo'
    })
  }

}

const deleteGame = async (req, res) => {

  try {
    const { id } = req.params

    await prisma.game.delete({
      where: {
        id
      }
    })
    res.status(204).send()

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Erro ao deletar jogo'
    })
  }


}

const updateGame = async (req, res) => {
  try {
    const { id} = req.params
    const {
      title,
      genre,
      platform,
      status,
      rating
  } = req.body 

  const game = await prisma.game.update ({
    where: {
      id,
    },
    data: {
      title,
      genre,
      platform,
      status,
      rating
    }
  })
  res.json(game)

  }  catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Erro ao atualizar jogo'
    })
}}

const getGameById = async (req, res) => {
  try {
    const { id } = req.params

    const game = await prisma.game.findUnique({
      where: {
        id
      }
    })

    if (!game) {
      return res.status(404).json({
        error: 'Jogo não encontrado'
      })
    }

    res.json(game)

  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Erro ao buscar jogo'
    })
  }
}

module.exports = {
    getGames,
    createGame,
    deleteGame,
    updateGame,
    getGameById
}