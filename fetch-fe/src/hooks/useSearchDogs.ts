import { searchDogs } from '@/api/dog'
import type { DogSearchParams, DogSearchResponse } from '@/api/dog.types'
import { useQuery } from '@tanstack/react-query'

export const useSearchDogs = (filters: Required<DogSearchParams>) => {
  const {
    data: searchResults = { resultIds: [], total: 0, next: '', prev: '' },
    isLoading: searchLoading,
  } = useQuery<DogSearchResponse>({
    queryKey: ['searchDogs', filters],
    queryFn: () => searchDogs(filters),
  })
  return { searchResults, searchLoading }
}
