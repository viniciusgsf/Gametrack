import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import './login.css'

function VerifyEmailSent() {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as { email?: string } | null
    const token = new URLSearchParams(location.search).get('token')

    const [email, setEmail] = useState(state?.email || localStorage.getItem('pendingEmail') || '')
    const [loading, setLoading] = useState(Boolean(token))
    const [resending, setResending] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (!token) {
            return
        }

        const verifyEmail = async () => {
            setLoading(true)
            setError('')
            setMessage('')

            try {
                const response = await api.get('/auth/verify-email', {
                    params: { token, email }
                })

                setMessage(response.data.message || 'E-mail verificado com sucesso!')
                setVerified(true)
            } catch (err: any) {
                setError(err.response?.data?.error || 'Não foi possível verificar o e-mail.')
            } finally {
                setLoading(false)
            }
        }

        verifyEmail()
    }, [token, email])

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setError('Informe um e-mail para reenviar a confirmação.')
            return
        }

        setResending(true)
        setError('')
        setMessage('')

        try {
            const response = await api.post('/auth/resend-verification', { email })
            setMessage(response.data.message || 'E-mail de confirmação enviado.')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Não foi possível reenviar o e-mail.')
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">📧 {token ? 'Confirmando e-mail' : 'Verifique seu e-mail'}</h1>

                <p className="auth-subtitle">
                    {token
                        ? 'Aguarde enquanto confirmamos seu endereço de e-mail.'
                        : 'Enviamos um link de confirmação para o seu e-mail. Clique no link recebido para ativar sua conta.'}
                </p>

                {loading && <p className="auth-subtitle">🔄 Confirmando seu e-mail...</p>}
                {message && <div className="auth-alert success">{message}</div>}
                {error && <div className="auth-alert error">{error}</div>}

                {!token && (
                    <form onSubmit={handleResend} style={{ width: '100%' }}>
                        <input type="email" placeholder="Seu e-mail" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <button type="submit" className="auth-button" disabled={resending}>
                            {resending ? 'Enviando...' : 'Reenviar e-mail'}
                        </button>
                    </form>
                )}

                <button className="auth-button" onClick={() => navigate('/login')}>
                    {verified ? 'Entrar no GameTrack' : 'Ir para Login'}
                </button>

                <button className="auth-button secondary" onClick={() => navigate('/')}>
                    Voltar para Home
                </button>
            </div>
        </div>
    )
}

export default VerifyEmailSent