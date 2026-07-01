import { useState, type FormEvent } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './ChangePassword.css'

function ChangePassword() {
    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert('Todos os campos são obrigatórios')
            return
        }

        if (newPassword !== confirmNewPassword) {
            alert('As senhas não coincidem')
            return
        }

        if (newPassword.length < 6) {
            alert('Nova senha deve ter ao menos 6 caracteres')
            return
        }

        try {
            await api.put('/users/password', {
                currentPassword,
                newPassword
            })

            alert('Senha alterada com sucesso!')
            navigate('/profile')
        } catch (error) {
            console.error(error)
            alert('Erro ao alterar senha')
        }
    }

    return (
        <div className="change-password-container">
            <form className="change-password-form" onSubmit={handleSubmit}>
                <h2 className="change-password-title">Alterar senha</h2>
                <input
                    className="change-password-input"
                    type="password"
                    placeholder="Senha atual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    className="change-password-input"
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    className="change-password-input"
                    type="password"
                    placeholder="Confirmar nova senha"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button className="change-password-button" type="submit">Alterar senha</button>
            </form>
        </div>
    )
}

export default ChangePassword