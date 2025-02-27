import { apiRequest } from '@/lib/request'
import type { User } from '@/types'

export const login = (user: User) => {
  return apiRequest('LOGIN', {
    method: 'POST',
    body: JSON.stringify(user),
  })
}

export const logout = () => {
  return apiRequest('LOGOUT', { method: 'POST' })
}
