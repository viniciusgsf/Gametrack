import './GameCard.css'

interface GameCardProps {
    id: string
    title: string
    status: string
    image: string
    onDelete: (id:string) => void
    onEdit: (id:string) => void

}

function GameCard({ id,title, status, image, onDelete, onEdit }: GameCardProps) {

    return (
        <div className="game-card">
            <img src={image} alt={title} className="game-card__image" />

            <div className="game-card__content">
                <h4 className="game-card__title">{title}</h4>
                <p className="game-card__status">{status}</p>
                <button className="game-card__delete" onClick={() => {onDelete(id)}}>
                    Excluir
                </button>
                <button className="game-card__edit" onClick={() => {onEdit(id)}}>
                    Editar
                </button>
            </div>
        </div>
    )

 }

 export default GameCard