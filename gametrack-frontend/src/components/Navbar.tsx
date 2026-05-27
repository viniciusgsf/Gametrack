function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-violet-500" />
      </div>
    </header>
  )
}

export default Navbar