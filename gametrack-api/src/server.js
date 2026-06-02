require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'GameTrack API running'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/games', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Game 1',
      genre: 'Action',
      platform: 'PC',
      status: 'Playing',
      rating: 8.5
    },
    {
      id: '2',
      title: 'Game 2',
      genre: 'RPG',
      platform: 'PS5',
      status: 'Completed',
      rating: 9.0
    }

  ])
})