import { useState, type FormEvent } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './ChangePassword.css'

function ChangePassword() {
    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [feedback, setFeedback] = useState<{type:'success'|'error'; message:string} | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setFeedback({ type: 'error', message: 'Preencha todos os campos.' })
            return
        }

        if (newPassword !== confirmNewPassword) {
            setFeedback({ type: 'error', message: 'As senhas não coincidem.' })
            return
        }

        if (newPassword.length < 6) {
            setFeedback({ type: 'error', message: 'A nova senha deve ter ao menos 6 caracteres.' })
            return
        }

        try {
            await api.put('/users/password', { currentPassword, newPassword })
            setFeedback({ type: 'success', message: 'Senha alterada com sucesso!' })
            navigate('/profile')
        } catch (error: any) {
            setFeedback({ type: 'error', message: error.response?.data?.error || 'Não foi possível alterar a senha.' })
        }
    }

    return (
        <div className="change-password-container">
            <form className="change-password-form" onSubmit={handleSubmit}>
                <h2 className="change-password-title">Alterar senha</h2>

                {feedback && (
                    <div className={`auth-alert ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <input className="change-password-input" type="password" placeholder="Senha atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <input className="change-password-input" type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <input className="change-password-input" type="password" placeholder="Confirmar nova senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                <button className="change-password-button" type="submit">Alterar senha</button>
            </form>
        </div>
    )
}

export default ChangePassword