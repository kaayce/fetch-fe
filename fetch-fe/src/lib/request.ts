import { BASE_URL, API_ENDPOINTS } from '@/constants'

export const apiRequest = async <T = unknown>(
  segment: keyof typeof API_ENDPOINTS,
  options: RequestInit = {},
  params?: Record<string, string>
): Promise<T | undefined> => {
  const searchParams = new URLSearchParams(params)
  const url = `
  ${BASE_URL}
  ${API_ENDPOINTS[segment]}
  ${params && '?' + searchParams.toString()}
  `
  const optionsWithHeaders: RequestInit = {
    credentials: 'include' as RequestCredentials,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  try {
    const res = await fetch(url, optionsWithHeaders)

    if (!res.ok) {
      console.error(res)
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    return undefined
  }
}
