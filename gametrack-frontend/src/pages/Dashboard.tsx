import GameCard from '../components/GameCard'

const games = [
  {
    title: 'Elden Ring',
    status: 'Finalizado',
    image:
      'https://images.unsplash.com/photo-1542751110-97427bbecf20'
  },
  {
    title: 'Baldur’s Gate 3',
    status: 'Jogando',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420'
  },
  {
    title: 'Cyberpunk 2077',
    status: 'Quero Jogar',
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8'
  }
]

function Dashboard() {
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
            key={game.title}
            title={game.title}
            status={game.status}
            image={game.image}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard