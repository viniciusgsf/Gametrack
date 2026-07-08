const prisma = require('../prisma/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendVerificationEmail, sendResetPasswordEmail } = require('../services/emailService')


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

        const verificationToken = crypto.randomBytes(32).toString('hex')

        const user = await prisma.user.create({
            data: {
                username, 
                email,
                password: hashedPassword,
                emailVerificationToken: verificationToken
            }
        })

        let emailSent = false

        try {
            const emailResult = await sendVerificationEmail(
                user.email,
                verificationToken
            )
            emailSent = Boolean(emailResult?.success)

            if (!emailResult.success) {
                console.warn(
                    'Falha ao enviar e-mail:',
                    emailResult.reason
                )
            }
        } catch (emailError) {
            // Email delivery is handled by the email service; failures are ignored here to keep registration flow simple.
        }

        res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username,
            emailSent
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

    if (!email || !password) {
      return res.status(400).json({
        error: 'Todos os campos são obrigatórios'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Senha deve ter pelo menos 6 caracteres'
      })
    } 

    if (!email.includes('@')) {
      return res.status(400).json({
        error: 'Email inválido'
      })
    }

    if (!user.verified) {
    return res.status(403).json({
      "error": "Seu e-mail ainda não foi verificado.",
      "verified": false
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

const verifyEmail = async (req, res) => {
    const { token, email } = req.query

    try {
      let user = null

      if (token && email) {
        user = await prisma.user.findFirst({
          where: {
            email: String(email),
            emailVerificationToken: String(token)
          }
        })
      } else if (token) {
        user = await prisma.user.findFirst({
          where: {
            emailVerificationToken: String(token)
          }
        })
      } else if (email) {
        user = await prisma.user.findUnique({
          where: {
            email: String(email)
          }
        })
      }

      if (!user) {
        return res.status(400).json({
          error: 'Token inválido'
        })
      }

      if (user.verified) {
        return res.json({
          message: 'Este e-mail já estava verificado.'
        })
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          verified: true,
          emailVerificationToken: null
        }
      })

      res.json({
        message: 'Email verificado com sucesso!'
      })

    }
    catch (error) {
      console.error(error)
      res.status(500).json({
        error: 'Erro ao verificar email'
      })
    }
}

const resendVerification = async (req,res ) => {
  const {email} = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) {
      return res.json({
        message: 'Se existir uma conta com esse e-mail, um link de verificação será enviado. Confira sua caixa de entrada'
      })
    }

    if (user.verified) {
      return res.json({
        error: 'Este e-mail já foi verificado'
      })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        emailVerificationToken: verificationToken
      }
    })

    let emailSent = false

    try {
        const emailResult = await sendVerificationEmail(
            user.email,
            verificationToken
        )
        emailSent = Boolean(emailResult?.success)
    } catch (emailError) {
        // Email delivery is handled by the email service; failures are ignored here to keep resend flow simple.
    }


    return res.json({
      message: 'Se existir uma conta com esse e-mail, um link de verificação será enviado. Confira sua caixa de entrada',
      emailSent
    }) 
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'Erro ao reenviar verificação'
    })
  }
}

const forgotPassword = async (req, res) => {
  const {email} = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user ) {
    return res.json({
      message: 'Se o email existir, eviaremos um link de redefinição de senha para ele'
    })
  }

  const resetToken = crypto.randomBytes(32).toString('hex')

  const expires = new Date(Date.now() +1000*60*60) // 1 hora

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      passwordResetToken: resetToken,
      passwordResetExpires: expires
    }
  })

      let emailSent = false

      try {
        const emailResult = await sendResetPasswordEmail(
            user.email,
            resetToken
        )
        emailSent = Boolean(emailResult?.success)
      } catch (emailError) {
        // Email delivery is handled by the email service; failures are ignored here to keep recovery flow simple.
      }

  res.json({
    message: 'Se o email existir, eviaremos um link de redefinição de senha para ele',
    emailSent
  })
}

const resetPassword = async (req, res) => {

const saltRounds = 10;

const {
    token,
    newRawPassword
} = req.body

try {

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetExpires: {
                gt: new Date()
            }
        }
    })

    if (!user) {
        return res.status(400).json({
            error: 'Token inválido ou expirado.'
        })
    }

    if (!newRawPassword || newRawPassword.length < 6) {
    return res.status(400).json({
        error: 'A senha deve ter pelo menos 6 caracteres.'
    })
}

    const hashedPassword = await bcrypt.hash(
        newRawPassword,
        saltRounds
    )

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null
        }
    })

    return res.json({
        message: 'Senha redefinida com sucesso!'
    })

} catch (error) {

    return res.status(500).json({
        error: 'Erro ao redefinir senha.'
    })

}
}



module.exports = {
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword, 
    resendVerification
}
