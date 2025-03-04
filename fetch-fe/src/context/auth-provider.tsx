import { useEffect, useMemo, type PropsWithChildren } from 'react'
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

  useEffect(() => {
    const storedUser = sessionStorageInstance.getValue<User>('user')
    if (storedUser) {
      navigate(pathname === PATHS.LOGIN ? PATHS.HOME : pathname)
    } else {
      navigate(PATHS.LOGIN)
    }
  }, [pathname, navigate])

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      sessionStorage.removeValue('user')
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
    onSuccess: (user) => {
      sessionStorageInstance.setValue<User>('user', user, HOUR)
      toast.success('Login Successful')
      navigate(PATHS.HOME)
    },
    onError: () => toast.error('Login Failed'),
  })

  const value = useMemo(
    () => ({
      user: sessionStorageInstance.getValue<User>('user'),
      isAuthenticated: !!sessionStorageInstance.getValue<User>('user'),
      signIn: signIn.mutate,
      signOut,
    }),
    [signIn.mutate, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
