import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'
// import Dashboard from '../pages/Dashboard'

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout