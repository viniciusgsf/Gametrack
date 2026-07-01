import { useState } from 'react'
import { api } from '../services/api'
import {useNavigate} from 'react-router-dom'
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault()

  try {
    const response = await api.post(
      '/auth/login',
      {
        email,
        password
      }
    )
    localStorage.setItem(
        'token',
        response.data.token
        )


    if (! email || ! password) {
      alert('Email ou senha incorretos')
      return
    }


    console.log(response.data)
    navigate('/dashboard')

  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h1 className="auth-title">
          Entrar
        </h1>

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

        <button
          type="submit"
          className="auth-button"
        >
          Entrar
        </button>

        <button
          type="button"
          className="auth-button secondary"
          onClick={() => navigate('/register')}
        >
          Cadastre-se
        </button>

      </form>
    </div>
  )
}




export default Login