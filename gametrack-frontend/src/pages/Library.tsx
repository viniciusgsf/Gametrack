import './Library.css'
import type { Game } from '../types/game'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api} from '../services/api'
import GameCard from '../components/GameCard'

function Library() {
    const [games, setGames] = useState<Game[]>([])
    const navigate = useNavigate()
    const [statusFilter, setStatusFilter] = useState("Todos")
    const [search, setSearch] = useState("")

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
    

    const filteredGames = games.filter(game => {
        const matchesSearch = 
        game.title.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === "Todos" ||
            game.status === statusFilter

        return matchesSearch && matchesStatus
    })
    
    useEffect(() => {
        async function loadGames() {
          const response = await api.get('/games')
          setGames(response.data)
        }
    
        loadGames()
      }, [])
    return (
        <div className="page-shell">
            <h1 className="page-title">Minha Biblioteca</h1>
            <div className="library-toolbar">
                <select
                    className="library-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Jogando">Jogando</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Quero Jogar">Quero Jogar</option>
                    <option value="Abandonado">Abandonado</option>
                </select>

                <input
                    className="library-search"
                    type='text'
                    placeholder='Pesquisar jogo...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="game-grid">
                {filteredGames.map((game)  => (
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

export default Library;