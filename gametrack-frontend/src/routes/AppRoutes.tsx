import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard.tsx'
import Library from '../pages/Library.tsx'
import Profile from '../pages/Profile.tsx'
import PrivateRoute from './PrivateRoute.tsx'

import Login from '../pages/login.tsx'
import Register from '../pages/Register.tsx'
import AddGame from '../pages/AddGame.tsx'
import Home from '../pages/Home.tsx'


function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Privadas */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/library"
            element={<Library />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/games/new"
            element={<AddGame />}
          />
          <Route
            path="/games/:id/edit"
            element={<AddGame />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes