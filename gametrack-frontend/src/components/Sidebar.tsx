import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h1 className="brand" onClick={() => navigate('/')}>GameTrack</h1>

        <button
          className="mobile-nav-toggle"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`nav-list${isMenuOpen ? ' open' : ''}`}>
        <NavLink
          to="/dashboard"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/library"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
        >
          Minha Biblioteca
        </NavLink>

        <NavLink
          to="/profile"
          onClick={closeMenu}
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
        >
          Perfil
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar