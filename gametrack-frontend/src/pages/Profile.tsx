import './Profile.css'
import ProfileCard from '../components/ProfileCard';
import StatCard from '../components/StatCard';
import Logout from '../components/Logout';
import type {User} from '../types/user'
import type {Game} from '../types/game'
import {useEffect, useState} from 'react'
import {api} from '../services/api'
import { useNavigate } from 'react-router-dom'

function Profile() {
const [games, setGames] = useState<Game[]>([])
const [user, setUser] = useState<User | null>(null)
const [avatar, setAvatar] = useState('')
const [avatarError, setAvatarError] = useState('')
const totalGames = games.length
const navigate = useNavigate()

const playingGames = games.filter(
  game => game.status === 'Jogando'
).length

const finishedGames = games.filter(
  game => game.status === 'Finalizado'
).length

const averageRating =
  games.length > 0
    ? (
        games.reduce(
          (sum, game) => sum + (game.rating ?? 0),
          0
        ) / games.length
      ).toFixed(1)
    : '0'

useEffect(() => {
    async function loadData() {
      try {
        const [gamesResponse, userResponse] = await Promise.all([
            api.get('/games'),
            api.get('/users/me')
        ])

        setGames(gamesResponse.data)
        setUser(userResponse.data)
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    loadData()
  }, [])
    if (!user) {
    return <p>Carregando...</p>
    }

const handleAvatarChange = async () => {
    const trimmedAvatar = avatar.trim()

    if (!trimmedAvatar) {
        setAvatarError('Insira uma URL válida para atualizar o avatar.')
        return
    }

    setAvatarError('')

    try {
        await api.put('/users/avatar', {
            avatar: trimmedAvatar
        })

        setUser({
            ...user!,
            avatar: trimmedAvatar
        })

        setAvatar('')
        alert('Avatar atualizado!')
    } catch (error) {
        console.error(error)
        setAvatarError('Não foi possível atualizar o avatar. Tente novamente.')
    }
}

    return (
        <div className="page-shell">
            <div className="profile-page">
                <h1 className="page-title">Meu Perfil</h1>

                <div className="profile-hero">
                    <div className="profile-hero-card">
                        <div className="profile-avatar-wrapper">
                            <img
                                className="profile-avatar"
                                src={user.avatar || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=300&q=80'}
                                alt="Foto de perfil"
                            />
                            <button
                                type="button"
                                className="profile-avatar-overlay"
                                aria-label="Atualizar foto de perfil"
                                title="Atualizar foto de perfil"
                            >
                                <span className="profile-avatar-icon">📷</span>
                            </button>
                        </div>
                        <div className="profile-copy">
                            <span className="profile-badge">Perfil</span>
                            <h2 className="profile-name">{user.username}</h2>
                            <p className="profile-description">
                                Gerencie sua coleção, acompanhe seu progresso e mantenha tudo organizado em um só lugar.
                            </p>

                            <div className="profile-avatar-editor">
                                <input
                                    className="profile-avatar-input"
                                    type="text"
                                    value={avatar}
                                    onChange={(e) => {
                                        setAvatar(e.target.value)
                                        if (avatarError) setAvatarError('')
                                    }}
                                    placeholder="Cole a URL da imagem"
                                />
                                <button className="profile-avatar-save" type="button" onClick={handleAvatarChange}>
                                    Salvar avatar
                                </button>
                            </div>
                            {avatarError ? <p className="profile-avatar-error">{avatarError}</p> : null}
                        </div>
                    </div>

                    <ProfileCard username={user.username} email={user.email} createdAt={new Date(user.createdAt).toLocaleDateString() } />
                </div>

                <div className="stats-grid">
                    <StatCard
                        title="Jogos"
                        value={totalGames}
                    />

                    <StatCard
                        title="Jogando"
                        value={playingGames}
                    />

                    <StatCard
                        title="Finalizados"
                        value={finishedGames}
                    />

                    <StatCard
                        title="Nota Média"
                        value={averageRating}
                    />
                </div>

                <div className="account-settings">
                    <button className="account-action" onClick={() => navigate('/change-password')}>Alterar senha</button>
                    <Logout className="account-action account-action--logout" />
                </div>
            </div>
        </div>
    )
}

export default Profile