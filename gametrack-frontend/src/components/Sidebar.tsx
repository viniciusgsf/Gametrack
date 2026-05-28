import {NavLink} from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold mb-10 text-violet-400">
        GameTrack
      </h1>

      <nav className="flex flex-col gap-4">
          <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              Dashboard
          </NavLink>

          <NavLink to="/library" className={({ isActive }) => 
            `px-4 py-3 rounded-xl transition ${isActive ? 'bg-violet-600 text-white'
             : 'text-slate-300 hover:bg-slate-800'}`}>
            Minha Biblioteca

          </NavLink>

        <NavLink to="/profile" className={({ isActive }) => 
            `px-4 py-3 rounded-xl transition ${isActive ? 'bg-violet-600 text-white'
             : 'text-slate-300 hover:bg-slate-800'}`}>
            Perfil

          </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar