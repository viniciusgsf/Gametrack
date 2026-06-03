import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'
import './MainLayout.css'
// import Dashboard from '../pages/Dashboard'

function MainLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-view">
        <Navbar />
        <div className="page-frame">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout