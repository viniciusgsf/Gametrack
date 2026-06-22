import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

function Navbar() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="brand-title">GameTrack</h2>
      </div>

      <div className="topbar-right">
        {token ? (
          <>
            <Logout className="logout-btn" />
            <div className="profile-pill" />
          </>
        ) : (
          <NavLink to="/login" className="login-btn">
            Entrar
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default Navbar