import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import type { User } from '../types'
import { AuthContext } from './index'
import { useLocation, useNavigate } from 'react-router'
import { login, logout } from '@/api/auth'

const LOGOUT_TIMEOUT = 1000 * 60 * 60 // 1 hour

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logoutTimer, setLogoutTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      navigate('/login')
    }
  }, [isAuthenticated, pathname, navigate])

  useEffect(() => {
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer)
    }
  }, [logoutTimer])

  const signOut = useCallback(async () => {
    await logout()
    setUser(null)
    setIsAuthenticated(false)

    if (logoutTimer) clearTimeout(logoutTimer)
    setLogoutTimer(null)
  }, [logoutTimer])

  const signIn = useCallback(
    async (user: User) => {
      const response = await login(user)

      if (!response) {
        console.error('Login failed')
        return
      }

      setUser(user)
      setIsAuthenticated(true)

      if (logoutTimer) clearTimeout(logoutTimer)
      const timer = setTimeout(() => signOut(), LOGOUT_TIMEOUT)
      setLogoutTimer(timer)
    },
    [signOut, logoutTimer]
  )

  const value = useMemo(
    () => ({ user, isAuthenticated, signIn, signOut }),
    [isAuthenticated, signIn, signOut, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
