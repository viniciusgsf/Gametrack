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

module.exports = {
    getMe
}