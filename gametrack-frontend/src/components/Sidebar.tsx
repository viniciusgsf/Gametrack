import {NavLink} from 'react-router-dom'
import './Sidebar.css'


function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="brand">GameTrack</h1>

      <nav className="nav-list">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `nav-link${isActive ? ' active' : ''}`
          }
        >
          Minha Biblioteca
        </NavLink>

        <NavLink
          to="/profile"
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