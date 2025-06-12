// src/hooks/useAuth.ts
export const useAuth = () => {
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Registration failed:', data)
        throw new Error(data?.detail || 'Registration failed')
      }

      return data
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.access)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  const user = localStorage.getItem('token') ? true : null

  return { register, login, logout, user }
}
