"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  authToken: string | null
  loggedIn: boolean
  saveAuth: (response: any) => void
  revokeAuth: () => void
}

const AUTH_INITIAL_VALUES: AuthContextProps = {
  authToken: null,
  loggedIn: false,
  saveAuth: (response: any) => {
    return response
  },
  revokeAuth: () => {
    throw new Error('Function not implemented')
  },
}

const AuthContext = createContext(AUTH_INITIAL_VALUES)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('loggedIn') || ''
      if (user) {
        return JSON.parse(user).token
      }
    }
    return null
  })

  const saveAuth = (response: any) => {
    setLoggedIn(true)
    localStorage.setItem('loggedIn', JSON.stringify(response))
    setAuthToken(() => response.token)
  }

  const revokeAuth = () => {
    setLoggedIn(false)
    localStorage.clear()
    setAuthToken(() => null)
  }

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn')
    if (storedLoggedIn) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        authToken,
        saveAuth,
        revokeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useLogin = () => useContext(AuthContext)

export { AuthContext, AuthProvider }
