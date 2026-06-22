import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    return (
         <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-6xl font-bold mb-6">
          GameTrack
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mb-10">
          Organize sua biblioteca de jogos,
          acompanhe seu progresso e avalie
          títulos de qualquer plataforma.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-violet-600 px-6 py-3 rounded-xl"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate('/register')}
            className="border border-slate-700 px-6 py-3 rounded-xl"
          >
            Criar Conta
          </button>
        </div>

      </div>
    </div>
    )
}

export default Home