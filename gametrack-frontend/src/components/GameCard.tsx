import './GameCard.css'

interface GameCardProps {
  title: string;
  status: string;
  image: string;
}

function GameCard({ title, status, image }: GameCardProps) {

    return (
        <div className="game-card">
            <img src={image} alt={title} className="game-card__image" />

            <div className="game-card__content">
                <h4 className="game-card__title">{title}</h4>
                <p className="game-card__status">{status}</p>
            </div>
        </div>
    )

 }

 export default GameCard