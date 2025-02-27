import { BASE_URL, API_ENDPOINTS } from '@/constants'

export const apiRequest = async <T = unknown>(
  segment: keyof typeof API_ENDPOINTS,
  options: RequestInit = {},
  params?: Record<string, string>
): Promise<T | string | undefined> => {
  try {
    const url = new URL(API_ENDPOINTS[segment], BASE_URL)

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      )
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

    if (!res.ok) {
      console.error(res)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const contentType = res.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return (await res.json()) as T
    } else {
      return await res.text()
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}
