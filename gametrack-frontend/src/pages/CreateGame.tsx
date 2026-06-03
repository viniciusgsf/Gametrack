import {useState} from 'react'
import type {FormEvent} from 'react'
import {api} from '../services/api'
import './CreateGame.css'

function CreateGame() {
    const [title,setTitle] = useState('')
    const [genre,setGenre] = useState('')
    const [platform,setPlatform] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        await api.post('/games', {
            title,
            genre,
            platform,
            status: 'Jogando',
            rating: 0
        })

        alert('Jogo Cadastrado!')
    }

    return(
        <div className="create-shell">
            <section className="create-card">
                <h2 className="create-title">Cadastrar Jogo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label className="form-label">Título</label>
                        <input
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Gênero</label>
                        <input
                            placeholder="Gênero"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Plataforma</label>
                        <input
                            placeholder="Plataforma"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="form-button"
                    >
                        Salvar
                    </button>
                </form>
            </section>
        </div>
    )
}


export default CreateGame