import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import type { User } from '../types'
import { AuthContext } from './index'
import { login, logout } from '@/api/auth'
import { HOUR, PATHS } from '@/lib/constants'
import sessionStorageInstance from '@/lib/storage'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [user, setUser] = useState<User | null>(
    sessionStorageInstance.getValue<User>('user')
  )

  useEffect(() => {
    const storedUser = sessionStorageInstance.getValue<User>('user')
    if (storedUser) {
      setUser(storedUser)
      navigate(pathname === PATHS.LOGIN ? PATHS.HOME : pathname)
    } else {
      navigate(PATHS.LOGIN)
    }
  }, [pathname, navigate])

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      sessionStorageInstance.removeValue('user')
      setUser(null)
      toast.success('Logged out successfully')
      navigate(PATHS.LOGIN)
    },
    onError: () => toast.error('Logout Failed'),
  })

  const signIn = useMutation({
    mutationFn: async (user: User) => {
      const response = await login(user)
      if (!response) throw new Error('Login failed')
      return user
    },
    onSuccess: (userData) => {
      sessionStorageInstance.setValue<User>('user', userData, HOUR)
      setUser(userData)
      toast.success('Login Successful')
      navigate(PATHS.HOME)
    },
    onError: () => toast.error('Login Failed'),
  })

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn: signIn.mutate,
      signOut,
    }),
    [user, signIn.mutate, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
