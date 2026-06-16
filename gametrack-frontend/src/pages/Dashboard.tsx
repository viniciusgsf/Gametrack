import GameCard from '../components/GameCard'
import {useEffect, useState} from 'react'
import {api} from '../services/api'
import type {Game} from '../types/game'
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'


function Dashboard() {
const [games, setGames] = useState<Game[]>([])
const navigate = useNavigate()

const handleDelete = async (id: string) => {
  try {
    await api.delete(`/games/${id}`)

    setGames(
      games.filter((game) => game.id !== id)
    )
  } catch (error) {
    console.error(error)
  }
}

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
        <h3 className="dashboard-title">Seus Jogos</h3>

        <button onClick={() => navigate('/games/new')} className="dashboard-action">
          Adicionar Jogo
        </button>
      </div>

      <div className="game-grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            status={game.status}
            image="https://placehold.co/600x400"
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard