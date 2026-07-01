require('dotenv').config()

const express = require('express')
const cors = require('cors')
const gameRoutes = require('./routes/gameRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/games', gameRoutes)
app.use('/auth', authRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'GameTrack API running'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

