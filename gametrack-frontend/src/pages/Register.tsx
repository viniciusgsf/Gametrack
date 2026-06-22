import { useState } from 'react'
import { api } from '../services/api'
import {useNavigate} from 'react-router-dom'
import './register.css'

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (
  e: React.FormEvent
) => {
  e.preventDefault()

  if (password !== confirmPassword) {
    alert('As senhas não coincidem')
    return
  }

  if (!username || !email || !password) {
    alert('Todos os campos são obrigatórios')
    return
  }

  if (username.length < 3) {
    alert('Usuário deve ter ao menos 3 caracteres')
    return
  }

  if (password.length < 6) {
    alert('Senha deve ter ao menos 6 caracteres')
    return
  }

  try {
    await api.post('/auth/register', {
      username,
      email,
      password
    })

    alert('Conta criada com sucesso!')
    navigate('/')

  } catch (error) {
    console.error(error)
    alert('Erro ao criar conta')
  }
}

    return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h1 className="auth-title">
          Criar conta
        </h1>

        <input
          type="text"
          placeholder="Nome de usuário"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar a Senha"
          className="auth-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="auth-button"
        >
          Criar conta
        </button>
      </form>
    </div>
  )
}

export default Register