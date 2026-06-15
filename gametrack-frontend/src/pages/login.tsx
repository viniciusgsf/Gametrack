import { useState } from 'react'
import { api } from '../services/api'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault()

  try {
    const response = await api.post(
      '/auth/login',
      {
        email,
        password
      }
    )
    localStorage.setItem(
        'token',
        response.data.token
        )

    console.log(response.data)
    navigate('/')

  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6">
          Entrar
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-violet-600 py-3 rounded-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}




export default Login