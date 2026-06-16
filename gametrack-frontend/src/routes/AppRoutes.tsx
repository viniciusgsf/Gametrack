import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard.tsx'
import Library from '../pages/Library.tsx'
import Profile from '../pages/Profile.tsx'

import Login from '../pages/login.tsx'
import AddGame from '../pages/AddGame.tsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />

          <Route path="/games/new" element={<AddGame />}
          // <Route path="games/:id/edit" element={<GameForm />} />
/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes