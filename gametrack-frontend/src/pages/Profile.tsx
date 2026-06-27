import './Profile.css'
import ProfileCard from '../components/ProfileCard';
import StatCard from '../components/StatCard';
import Logout from '../components/Logout';
import type {Game} from '../types/game'
import {useEffect, useState} from 'react'
import {api} from '../services/api'

function Profile() {
const [games, setGames] = useState<Game[]>([])
const totalGames = games.length

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
    async function loadGames() {
      const response = await api.get('/games')
      setGames(response.data)
    }

    loadGames()
  }, [])

    return (
        <div className="page-shell">
            <div className="profile-page">
                <h1 className="page-title">Meu Perfil</h1>

                <div className="profile-hero">
                    <div className="profile-hero-card">
                        <img
                            className="profile-avatar"
                            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=300&q=80"
                            alt="Foto de perfil"
                        />
                        <div className="profile-copy">
                            <span className="profile-badge">Perfil</span>
                            <h2 className="profile-name">Vinicius</h2>
                            <p className="profile-description">
                                Gerencie sua coleção, acompanhe seu progresso e mantenha tudo organizado em um só lugar.
                            </p>
                        </div>
                    </div>

                    <ProfileCard username='Vinicius' email='vinicius@teste.com' createdAt='27/06/26' />
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
                    <button className="account-action">Alterar senha</button>
                    <Logout className="account-action account-action--logout" />
                </div>
            </div>
        </div>
    )
}

export default Profile