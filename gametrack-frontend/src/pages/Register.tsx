import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './register.css'

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [feedback, setFeedback] = useState<{type:'success'|'error'; message:string} | null>(null)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setFeedback({ type: 'error', message: 'As senhas não coincidem.' })
            return
        }

        if (!username || !email || !password) {
            setFeedback({ type: 'error', message: 'Preencha todos os campos.' })
            return
        }

        if (username.length < 3) {
            setFeedback({ type: 'error', message: 'O nome de usuário deve ter ao menos 3 caracteres.' })
            return
        }

        if (password.length < 6) {
            setFeedback({ type: 'error', message: 'A senha deve ter ao menos 6 caracteres.' })
            return
        }

        try {
            await api.post('/auth/register', { username, email, password })
            localStorage.setItem('pendingEmail', email)
            setFeedback({ type: 'success', message: 'Conta criada com sucesso! Verifique seu e-mail.' })
            navigate('/verify-email-sent', { state: { email } })
        } catch (error: any) {
            setFeedback({ type: 'error', message: error.response?.data?.error || 'Não foi possível criar a conta.' })
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleRegister} className="auth-form">
                <h1 className="auth-title">Criar conta</h1>

                {feedback && (
                    <div className={`auth-alert ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <input type="text" placeholder="Nome de usuário" className="auth-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirmar a Senha" className="auth-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit" className="auth-button">Criar conta</button>
            </form>
        </div>
    )
}

export default Register