import { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DAY, PATHS } from './constants'
import sessionStorageInstance from './storage'

const handleGlobalQueryError = (error: Error) => {
  const errorMessage = error.message || 'An unknown error occurred'

  if (
    errorMessage.includes('401') ||
    errorMessage.includes('Authentication failed')
  ) {
    sessionStorageInstance.removeValue('user')
    toast.error('Your session has expired. Please log in again.')

    if (typeof window !== 'undefined') {
      window.location.href = PATHS.LOGIN
    }
  } else {
    toast.error(`API Error: ${errorMessage}`)
  }
}

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DAY,
        placeholderData: (prev: unknown) => prev,
        retry: (failureCount, error: Error) => {
          if (
            error.message.includes('401') ||
            error.message.includes('Authentication failed')
          ) {
            return false
          }

          return failureCount < 3
        },
      },
      mutations: {
        onError: handleGlobalQueryError,
      },
    },
  })
