import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard.tsx'
import Library from '../pages/Library.tsx'
import Profile from '../pages/Profile.tsx'
import CreateGame from '../pages/CreateGame.tsx'
import Login from '../pages/login.tsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-game" element={<CreateGame />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes