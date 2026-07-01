const prisma = require('../prisma/prisma')

const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                createdAt: true
            }
        })

        res.json(user)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Erro ao buscar usuário'
        })
    }
}

const changePassword = async (req, res) => {
    const {currentPassword, newPassword} = req.body

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    const bcrypt = require('bcrypt')

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!passwordMatch ) {
        return res.status(400).json({
            error: 'Senha atual incorreta'
        })
    }

    const hashedPassword =
    await bcrypt.hash(
        newPassword,
        10
    )

    await prisma.user.update({
        where: {
            id: req.user.id
        }, 
        data: {
            password: hashedPassword
        }
    })

    res.json({
        message: 'Senha alterada com sucesso'
    })
}

const updateAvatar = async (req, res) => {
    const { avatar } = req.body

    try {

        const user = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                avatar
            }
        })

        res.json(user)

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: 'Erro ao atualizar avatar'
        })
    }
}

module.exports = {
    getMe, 
    changePassword,
    updateAvatar
}