import React, { useState } from 'react';
import {api} from '../services/api';
import {useNavigate} from 'react-router-dom';

function AddGame() {
    const navigate = useNavigate();

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
            await api.post('/games', {
                title,
                genre,
                platform,
                status,
                rating
            })

            navigate('/')
        } catch(error) {
            console.error(error)
        }
    }


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
            <option value="action">Ação</option>
            <option value="action-adventure">Ação-Aventura </option>
            <option value="adventure">Aventura </option>
            <option value="casual">Casual</option>
            <option value="fighting">Luta</option>
            <option value="FPS">FPS</option>
            <option value="puzzle">Quebra-Cabeça </option>
            <option value="racing">Corrida</option>
            <option value="RPG">RPG </option>
            <option value="simulation">Simulação</option>
            <option value="e-sports">Esportes </option>
            <option value="strategy">Estratégia</option>
            <option value="Survival Horror ">Survival Horror</option>




            
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
            <option value="pc">PC</option>
            <option value="ps5">PS5</option>
            <option value="xbox">Xbox</option>
            <option value="switch">Switch</option>
            <option value="mobile">Mobile</option>

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
            <option value="playing">Jogando</option>
            <option value="finished">Finalizado</option>
            <option value="want-to-play">Quero Jogar</option>
            <option value="abandoned">Abandonado</option>

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