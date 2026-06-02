import GameCard from '../components/GameCard'
import {useEffect, useState} from 'react'
import {api} from '../services/api'
import type {Game} from '../types/game'



function Dashboard() {
const [games, setGames] = useState<Game[]>([])


useEffect(() => {
    async function loadGames() {
      const response = await api.get('/games')
      setGames(response.data)
    }

    loadGames()
  }, [])
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold">
          Seus Jogos
        </h3>

        <button className="bg-violet-600 hover:bg-violet-500 transition px-5 py-3 rounded-xl font-medium">
          Adicionar Jogo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
       {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          status={game.status}
          image="https://placehold.co/600x400"
        />
      ))}
      </div>
    </div>
  )
}

export default Dashboard