export class SessionStorage {
  setValue<T>(key: string, value: T, ttl?: number) {
    const expiration = ttl ? Date.now() + ttl : null
    const item = {
      value,
      expiration,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  getValue<T>(key: string): T | null {
    const itemString = sessionStorage.getItem(key)
    if (!itemString) {
      return null
    }

    try {
      const item = JSON.parse(itemString)
      if (item.expiration && Date.now() > item.expiration) {
        this.removeValue(key)
        return null
      }
      return item.value
    } catch {
      return null
    }
  }

  removeValue(key: string) {
    sessionStorage.removeItem(key)
  }
}

const sessionStorageInstance = new SessionStorage()
export default sessionStorageInstance
