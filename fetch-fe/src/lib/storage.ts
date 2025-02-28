import { HOUR } from './constants'

class SessionStorage {
  setValue(key: string, value: string, ttl: number = HOUR) {
    const expiration = Date.now() + ttl
    const item = {
      value,
      expiration,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  getValue(key: string): string | null {
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
}

export default SessionStorage
