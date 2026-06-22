import { useNavigate } from 'react-router-dom'

type Props = {
    className?: string
}

function Logout({ className }: Props) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    if (!token) return null

    return (
        <button className={className ?? 'logout-btn'} onClick={handleLogout}>
            Sair
        </button>
    )
}

export default Logout