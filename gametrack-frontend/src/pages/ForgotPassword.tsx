import { useState, type FormEvent } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './login.css'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState<{type:'success'|'error'; message:string} | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email) {
            setFeedback({ type: 'error', message: 'Informe seu e-mail para continuar.' })
            return
        }

        try {
            await api.post('/auth/forgot-password', { email })
            setFeedback({ type: 'success', message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.' })
            setEmail('')
        } catch (error) {
            setFeedback({ type: 'error', message: 'Não foi possível solicitar a redefinição de senha.' })
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1 className="auth-title">Recuperar senha</h1>
                <p className="auth-subtitle">
                    Informe o e-mail cadastrado para receber instruções de redefinição.
                </p>

                {feedback && (
                    <div className={`auth-alert ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <input type="email" placeholder="E-mail" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="submit" value="Enviar" className="auth-button" />

                <button type="button" className="auth-button secondary" onClick={() => navigate('/login')}>
                    Voltar ao login
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword