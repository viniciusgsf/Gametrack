const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    {email},
                    {username}
                ]
            }
        })

        if (userExists) {
            return res.status(400).json({
                error: 'Usuário ja existe'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10) 

        const user = await prisma.user.create({
            data: {
                username, 
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username
        })

    } catch (error) {
        console.log (error)
        res.status(500).json ({
            error: 'Erro de cadastro, confira suas informações e tente novamente'
        })
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(401).json({
        error: 'Email ou senha inválidos'
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Email ou senha inválidos'
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Erro ao fazer login'
    })
  }
}

module.exports = {
    register,
    login
}