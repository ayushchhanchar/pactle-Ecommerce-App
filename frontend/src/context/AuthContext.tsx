import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import api from '../utils/api'

interface MyToken {
  username: string
  exp: number
}

interface AuthContextType {
  user: MyToken | null
  login: (u: string, p: string) => Promise<void>
  register: (u: string, p: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MyToken | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setUser(jwtDecode<MyToken>(t))
  }, [])

  const login = async (username: string, password: string) => {
    const res = await api.post('/token/', { username, password })
    const t = res.data.access
    localStorage.setItem('token', t)
    setUser(jwtDecode<MyToken>(t))
  }

  const register = async (username: string, password: string) => {
    await api.post('/register/', { username, password })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}
