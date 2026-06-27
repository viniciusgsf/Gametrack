import GameCard from '../components/GameCard'
import StatCard from '../components/StatCard'
import {useEffect, useState} from 'react'
import {api} from '../services/api'
import type {Game} from '../types/game'
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'


function Dashboard() {
const [games, setGames] = useState<Game[]>([])
const navigate = useNavigate()

const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    'Deseja realmente excluir este jogo?'
  )

  if (!confirmed) return

  try {
    await api.delete(`/games/${id}`)

    setGames((previousGames) =>
      previousGames.filter(
        (game) => game.id !== id
      )
    )

  } catch (error) {
    console.error(error)
  }
}

const handleEdit = (id: string) => {
  navigate(`/games/${id}/edit`)
}

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
  <div className="dashboard-shell">

    <div className="dashboard-header">
      <h3 className="dashboard-title">
        Seus Jogos
      </h3>

      <button
        onClick={() => navigate('/games/new')}
        className="dashboard-action"
      >
        Adicionar Jogo
      </button>
    </div>

    {/* Cards de estatísticas */}
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

    {/* Lista de jogos */}
    <div className="game-grid">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          genre={game.genre}
          platform={game.platform}
          title={game.title}
          status={game.status}
          rating={game.rating ?? 0}
          image="https://placehold.co/600x400"
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>

  </div>
)
}

export default Dashboard