import type { User } from '@/types'
import { HOUR } from './constants'

class SessionStorage {
  setValue<T = User | string>(key: string, value: T, ttl: number = HOUR) {
    const expiration = Date.now() + ttl
    const item = {
      value,
      expiration,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  getValue<T = User | string>(key: string): T | null {
    const itemString = sessionStorage.getItem(key)
    if (!itemString) {
      return null
    }

    const item = JSON.parse(itemString)
    if (Date.now() > item.expiration) {
      sessionStorage.removeItem(key)
      return null
    }

    return item.value
  }

  removeValue(key: string) {
    sessionStorage.removeItem(key)
  }
}

export default SessionStorage
