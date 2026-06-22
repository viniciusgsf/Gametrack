import './GameCard.css'

interface GameCardProps {
    id: string
    title: string
    status: string
    image: string
    rating: number
    onDelete: (id:string) => void
    onEdit: (id:string) => void

}

function GameCard({ id,title, status, image, rating, onDelete, onEdit }: GameCardProps) {

    return (
        <div className="game-card">
            <img src={image} alt={title} className="game-card__image" />

            <div className="game-card__content">
                <h4 className="game-card__title">{title}</h4>
                <div className='game-card-content__props'>
                    <p className="game-card__status">{status}</p>
                    <p className="game-card__rating">Nota:{rating}</p>
                </div>
                
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