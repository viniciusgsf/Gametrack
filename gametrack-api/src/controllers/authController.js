const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')

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


module.exports = {
    register
}