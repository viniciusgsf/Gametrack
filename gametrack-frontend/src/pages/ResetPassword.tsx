import { useState, type FormEvent } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import './ChangePassword.css'

function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [feedback, setFeedback] = useState<{type:'success'|'error'; message:string} | null>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!token) {
            setFeedback({ type: 'error', message: 'Link inválido. Solicite um novo pedido de redefinição.' })
            navigate('/forgot-password')
            return
        }

        if (!password || !confirmPassword) {
            setFeedback({ type: 'error', message: 'Preencha todos os campos.' })
            return
        }

        if (password !== confirmPassword) {
            setFeedback({ type: 'error', message: 'As senhas não coincidem.' })
            return
        }

        if (password.length < 6) {
            setFeedback({ type: 'error', message: 'A nova senha deve ter ao menos 6 caracteres.' })
            return
        }

        try {
            await api.post('/auth/reset-password', { token, newRawPassword: password })
            setFeedback({ type: 'success', message: 'Senha alterada com sucesso!' })
            navigate('/login')
        } catch (error: any) {
            setFeedback({ type: 'error', message: error.response?.data?.error || 'Não foi possível alterar a senha.' })
        }
    }

    return (
        <div className="change-password-container">
            <form className="change-password-form" onSubmit={handleSubmit}>
                <h2 className="change-password-title">Redefinir senha</h2>

                {feedback && (
                    <div className={`auth-alert ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <input className="change-password-input" type="password" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="change-password-input" type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button className="change-password-button" type="submit">Redefinir senha</button>
            </form>
        </div>
    )
}

export default ResetPassword