import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState<{type:'success'|'error'; message:string} | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setFeedback({ type: 'error', message: 'Informe seu e-mail e senha para entrar.' })
      return
    }

    try {
      const response = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      setFeedback({ type: 'success', message: 'Login realizado com sucesso!' })
      navigate('/dashboard')
    } catch (error: any) {
      setFeedback({ type: 'error', message: error.response?.data?.error || 'Não foi possível entrar. Verifique suas credenciais.' })
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h1 className="auth-title">Entrar</h1>

        {feedback && (
          <div className={`auth-alert ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

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

        <button type="submit" className="auth-button">Entrar</button>

        <button type="button" className="auth-button secondary" onClick={() => navigate('/register')}>
          Cadastre-se
        </button>

        <button type="button" className="auth-button secondary" onClick={() => navigate('/forgot-password')}>
          Esqueci minha senha
        </button>
      </form>
    </div>
  )
}

export default Login