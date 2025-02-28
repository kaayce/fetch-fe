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
import SessionStorage from '@/lib/storage'

const LOGOUT_TIMEOUT = 1000 * 60 * 60 // 1 hour
const sessionStorage = new SessionStorage()

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logoutTimer, setLogoutTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  console.log({ user })

  useEffect(() => {
    const storedUser = sessionStorage.getValue<User>('user')
    if (storedUser) {
      setUser(storedUser)
      setIsAuthenticated(true)
    } else if (pathname !== '/login') {
      navigate('/login')
    }
  }, [pathname, navigate, isAuthenticated])

  useEffect(() => {
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer)
    }
  }, [logoutTimer])

  const signOut = useCallback(async () => {
    await logout()
    setUser(null)
    setIsAuthenticated(false)
    sessionStorage.removeValue('user')

    if (logoutTimer) clearTimeout(logoutTimer)
    setLogoutTimer(null)

    navigate('/login')
  }, [logoutTimer, navigate])

  const signIn = useCallback(
    async (user: User) => {
      const response = await login(user)

      if (!response) {
        console.error('Login failed')
        return
      }

      setUser(user)
      setIsAuthenticated(true)
      sessionStorage.setValue('user', user)

      if (logoutTimer) clearTimeout(logoutTimer)
      const timer = setTimeout(() => signOut(), LOGOUT_TIMEOUT)
      setLogoutTimer(timer)

      navigate('/')
    },
    [logoutTimer, navigate, signOut]
  )

  const value = useMemo(
    () => ({ user, isAuthenticated, signIn, signOut }),
    [isAuthenticated, signIn, signOut, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
