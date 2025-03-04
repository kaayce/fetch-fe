import { searchLocations } from '@/api/location'
import type {
  LocationSearchParams,
  LocationSearchResponse,
} from '@/api/location.types'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

/* TODO:
 * issue with API: "/locations/search"
 * docs give request body as LocationSearchParams but API expects a list of zipCodes
 */

export const useSearchLocations = (locationFilters: LocationSearchParams) => {
  const {
    data: searchLocationsData = {} as LocationSearchResponse,
    isLoading: searchLocationsLoading,
  } = useQuery({
    queryKey: ['searchLocations', locationFilters],
    queryFn: () => searchLocations(locationFilters),
  })

  const stateToCities = useMemo(() => {
    return searchLocationsData?.results?.reduce((acc, location) => {
      if (!acc[location.state]) {
        acc[location.state] = new Set()
      }

      acc[location.state].add(location.city)

      return acc
    }, {} as Record<string, Set<string>>)
  }, [searchLocationsData?.results])

  return {
    searchLocationsData,
    searchLocationsLoading,
    stateToCities,
  }
}
