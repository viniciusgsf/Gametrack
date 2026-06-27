import './ProfileCard.css'

interface ProfileCardProps {
    username: string
    email: string
    createdAt: string
}

function ProfileCard({
    username,
    email,
    createdAt
}: ProfileCardProps) {

    return (
        <div className="profile-card">
            <div className="profile-card__header">
                <span className="profile-card__eyebrow">Conta</span>
                <h3 className="profile-card__title">{username}</h3>
            </div>

            <div className="profile-card__info">
                <div className="profile-card__item">
                    <span className="profile-card__label">E-mail</span>
                    <p className="profile-card__value">{email}</p>
                </div>

                <div className="profile-card__item">
                    <span className="profile-card__label">Membro desde</span>
                    <p className="profile-card__value">{createdAt}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard