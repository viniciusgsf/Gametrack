const path = require('path')
const { Resend } = require('resend')

try {
     require('dotenv').config()
} catch (error) {
    // dotenv is optional in this environment
}

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null

const sendVerificationEmail = async (email, token) => {
    const verificationLink =
        `http://localhost:5173/verify-email?token=${token}`

    if (!resend) {
        return { success: false, reason: 'missing-api-key' }
    }

    try {
        const response = await resend.emails.send({
            from: 'GameTrack <onboarding@resend.dev>',
            to: email,
            subject: 'Confirme seu e-mail',
            html: `
                <h2>Bem-vindo ao GameTrack!</h2>

                <p>
                    Clique no botão abaixo para confirmar seu e-mail.
                </p>

                <a href="${verificationLink}">
                    Confirmar e-mail
                </a>
            `
        })

        return { success: true, id: response?.data?.id || null }
    } catch (error) {
        return { success: false, reason: 'send-failed' }
    }
}

const sendResetPasswordEmail = async (email, token) => {
    const resetLink =
        `http://localhost:5173/reset-password?token=${token}`

    if (!resend) {
        return { success: false, reason: 'missing-api-key' }
    }

    try {
        const response = await resend.emails.send({
            from: 'GameTrack <onboarding@resend.dev>',
            to: email,
            subject: 'Redefinição de senha',
            html: `
                <h2>Redefinição de senha</h2>

                <p>
                    Clique no botão abaixo para criar uma nova senha.
                </p>

                <a href="${resetLink}">
                    Redefinir senha
                </a>
            `
        })

        return { success: true, id: response?.data?.id || null }
    } catch (error) {
    console.error('Erro ao enviar e-mail:', error)

    return {
        success: false,
        reason: error.message
    }
}
}

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail
}