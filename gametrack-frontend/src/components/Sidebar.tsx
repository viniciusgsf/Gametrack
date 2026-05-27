function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold mb-10 text-violet-400">
        GameTrack
      </h1>

      <nav className="flex flex-col gap-4">
        <button className="text-left hover:text-violet-400 transition">
          Dashboard
        </button>

        <button className="text-left hover:text-violet-400 transition">
          Minha Biblioteca
        </button>

        <button className="text-left hover:text-violet-400 transition">
          Perfil
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar