import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  const heroImage = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80'

  const posts = [
    {
      title: 'Elden Ring merece um replay em 2026?',
      author: 'u/gamerflux',
      time: '8h',
      votes: '1.2k',
      comments: '184',
      tag: 'Soulslike',
      text: 'A experiência continua absurdamente boa mesmo depois de tantas horas. Quem mais está pensando em voltar?',
      image: 'https://placehold.co/800x450/111827/8b5cf6?text=Elden+Ring'
    },
    {
      title: 'Minha coleção de indie games ficou tão boa que virou um moodboard',
      author: 'u/indieobsessed',
      time: '12h',
      votes: '842',
      comments: '63',
      tag: 'Indie',
      text: 'Acho que o melhor da plataforma é descobrir pequenos jogos que ninguém mais fala.',
      image: 'https://placehold.co/800x450/111827/22c55e?text=Indie+Moodboard'
    },
    {
      title: 'Baldur’s Gate 3 virou meu hábito da noite',
      author: 'u/questlog',
      time: '1d',
      votes: '611',
      comments: '91',
      tag: 'RPG',
      text: 'Estou no capítulo 3 e ainda não consigo parar. O ritmo está impecável.',
      image: 'https://placehold.co/800x450/111827/f59e0b?text=Baldur%27s+Gate+3'
    }
  ]

  return (
    <div className="home-page" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="home-page__overlay" />
      <div className="home-page__content">
        <div className="home-page__topbar">
          <div className="home-page__brand">
            <p>r/gametrack</p>
            <p>Popular • Jogos • Comunidade</p>
          </div>
          <div className="home-page__actions">
            <button onClick={() => navigate('/login')} className="home-page__button home-page__button--primary">
              Entrar
            </button>
            <button onClick={() => navigate('/register')} className="home-page__button home-page__button--secondary">
              Criar conta
            </button>
          </div>
        </div>

        <div className="home-page__grid">
          <div className="home-page__column">
            <div className="home-page__card">
              <div className="home-page__hero-image" style={{ backgroundImage: `url(${heroImage})` }} />
              <div className="home-page__hero-content">
                <span className="home-page__eyebrow">Destaque da comunidade</span>
                <h1 className="home-page__title">O feed mais vivo para sua biblioteca gamer</h1>
                <p className="home-page__text">
                  Veja o que a comunidade está jogando, compartilhe conquistas e descubra recomendações como em um subreddit de games, mas com seu perfil e sua coleção organizados.
                </p>
                <div className="home-page__tags">
                  <span className="home-page__tag">#Trending</span>
                  <span className="home-page__tag">#Co-op</span>
                  <span className="home-page__tag">#Replay</span>
                </div>
              </div>
            </div>

            {posts.map((post) => (
              <div key={post.title} className="home-page__card home-page__post">
                <div className="home-page__post-header">
                  <div>
                    <p className="home-page__post-meta">{post.author} • {post.time}</p>
                    <h2 className="home-page__post-title">{post.title}</h2>
                  </div>
                  <span className="home-page__post-tag">{post.tag}</span>
                </div>

                <img src={post.image} alt={post.title} className="home-page__post-image" />

                <p className="home-page__text">{post.text}</p>

                <div className="home-page__post-actions">
                  <span>▲ {post.votes}</span>
                  <span>💬 {post.comments}</span>
                  <span>🔖 Salvar</span>
                </div>
              </div>
            ))}
          </div>

          <div className="home-page__column">
            <div className="home-page__card home-page__sidebar-card">
              <h3 className="home-page__sidebar-title">Popular agora</h3>
              <div>
                <div className="home-page__list-item">
                  <p className="home-page__list-title">Top 10 jogos de 2026</p>
                  <p className="home-page__list-subtitle">1.4k membros discutindo</p>
                </div>
                <div className="home-page__list-item">
                  <p className="home-page__list-title">Co-op night</p>
                  <p className="home-page__list-subtitle">Sessão de jogos em grupo</p>
                </div>
                <div className="home-page__list-item">
                  <p className="home-page__list-title">Recomendações de indie</p>
                  <p className="home-page__list-subtitle">Novos títulos toda semana</p>
                </div>
              </div>
            </div>

            <div className="home-page__card">
              <div className="home-page__hero-image" style={{ backgroundImage: 'url(https://placehold.co/800x320/111827/38bdf8?text=Perfil+Gametrack)' }} />
              <div className="home-page__sidebar-card">
                <h3 className="home-page__sidebar-title">Seu perfil em destaque</h3>
                <div className="home-page__list-item">
                  <p className="home-page__list-subtitle">Última atividade</p>
                  <p className="home-page__list-title">Finalizou Hades em 12h e marcou como favorito.</p>
                </div>
                <button className="home-page__button home-page__button--primary">Ver perfil</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home