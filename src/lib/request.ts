import { BASE_URL, API_ENDPOINTS, PATHS } from '@/lib/constants'
import sessionStorageInstance from './storage'

export const apiRequest = async <T = unknown>(
  segment: keyof typeof API_ENDPOINTS,
  options: RequestInit = {},
  params?: URLSearchParams
): Promise<T> => {
  try {
    const url = new URL(API_ENDPOINTS[segment], BASE_URL)

    if (params) {
      params.forEach((value, key) => {
        url.searchParams.append(key, value)
      })
    }

    const optionsWithHeaders: RequestInit = {
      credentials: 'include' as RequestCredentials,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const res = await fetch(String(url), optionsWithHeaders)

    if (res.status === 401) {
      console.error('Authentication error detected')
      sessionStorageInstance.removeValue('user')

      if (typeof window !== 'undefined') {
        if (window.location.pathname === PATHS.LOGIN) {
          window.location.reload()
        } else {
          window.location.href = PATHS.LOGIN
        }
      }

      throw new Error('Authentication failed. Redirecting to login...')
    }

    if (!res.ok) {
      console.error(res)
      throw new Error(`API error. Status: ${res.status}`)
    }

    const contentType = res.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return (await res.json()) as T
    } else {
      return (await res.text()) as T
    }
  } catch (error: unknown) {
    console.error(`API request failed for ${segment}:`, error)
    throw error
  }
}
