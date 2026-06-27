import React, { useEffect, useState } from 'react';
import {api} from '../services/api';
import {useNavigate, useParams} from 'react-router-dom';


function AddGame() {
    const navigate = useNavigate();
    const {id} = useParams()


    const [title, setTitle] = useState('')
    const [genre, setGenre] =useState('')
    const [platform, setPlatform] =useState('')
    const [status, setStatus] =useState('')
    const [rating, setRating] =useState<number | ''>('')

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault()

        try {
            if (id) {
            await api.put(`/games/${id}`, {
              title,
              genre,
              platform,
              status,
              rating
            })
          } else {
            await api.post('/games', {
              title,
              genre,
              platform,
              status,
              rating
            })
          }

            navigate('/dashboard')
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
      if (!id) return

      async function loadGame() {
        const response =
          await api.get(`/games/${id}`)

        const game = response.data

        setTitle(game.title)
        setGenre(game.genre)
        setPlatform(game.platform)
        setStatus(game.status)
        setRating(game.rating)
      }

      loadGame()
    }, [id])

    return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Adicionar Jogo
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >
        <input
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        {/* <input
          placeholder="Gênero"
          value={genre}
          onChange={(e) =>
            setGenre(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        /> */}
        
        <select name="Genre" id="Genre-Change" className="w-full p-3 rounded bg-slate-800"
            value={genre}
            onChange={(e) =>
            setGenre(e.target.value)
          }>
            <option value="">--Selecione um Gênero--</option>
            <option value="Ação">Ação</option>
            <option value="Ação-Aventura">Ação-Aventura </option>
            <option value="Aventura">Aventura </option>
            <option value="Casual">Casual</option>
            <option value="Luta">Luta</option>
            <option value="FPS">FPS</option>
            <option value="Quebra-Cabeça">Quebra-Cabeça </option>
            <option value="Corrida">Corrida</option>
            <option value="RPG">RPG </option>
            <option value="Simulação">Simulação</option>
            <option value="E-sportes">Esportes </option>
            <option value="Estratégia">Estratégia</option>
            <option value="Survival Horror ">Survival Horror</option>
            <option value="Gatcha ">Gatcha </option>




            
        </select>

        {/* <input
          placeholder="Plataforma"
          value={platform}
          onChange={(e) =>
            setPlatform(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        /> */}

        <select name="Platform" id="platform-Change" className="w-full p-3 rounded bg-slate-800"
            value={platform}
            onChange={(e) =>
            setPlatform(e.target.value)
          }>
            <option value="">--Selecione uma plataforma--</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Mobile">Mobile</option>

        </select>

        {/* <input
          placeholder="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        /> */}

        <select name="Status" id="status-Change" className="w-full p-3 rounded bg-slate-800"
            value={status}
            onChange={(e) =>
            setStatus(e.target.value)
          }>
            <option value="">--Selecione um status--</option>
            <option value="Jogando">Jogando</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Quero Jogar">Quero Jogar</option>
            <option value="Abandonado">Abandonado</option>

        </select>

        <input
          type="number"
          min={1}
          max={10}
          placeholder="Nota"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value === '' ? '': Number(e.target.value))
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <button
          className="bg-violet-600 px-6 py-3 rounded-xl"
        >
          Salvar
        </button>
      </form>
    </div>
  )

}

export default AddGame