import type { DogSearchParams, DogWithLocation } from '@/api/dog.types'
import { useFetchLocations } from './useFetchLocations'
import type { GeoInfo } from '@/api/location.types'
import { useFetchDogsById } from './useFetchDogsById'
import { useSearchDogs } from './useSearchDogs'
import { useMemo } from 'react'

export const useDogs = (filters: Required<DogSearchParams>) => {
  // search dogs
  const { searchResults, searchLoading } = useSearchDogs(filters)

  // Fetch the dogs by their IDs
  const { dogs, dogsLoading } = useFetchDogsById({
    ids: searchResults.resultIds,
    enabled: searchResults.resultIds.length > 0 && !searchLoading,
  })

  const zipCodes = [...new Set(dogs.map((d) => d.zip_code).filter(Boolean))]

  const canFetchLocations =
    !dogsLoading && !searchLoading && zipCodes.length > 0

  // Fetch the locations for the dogs
  const { locations, locationsLoading } = useFetchLocations({
    zipCodes,
    enabled: canFetchLocations,
  })

  const dogsWithLocation: DogWithLocation[] = useMemo(() => {
    if (locationsLoading || dogsLoading || !dogs.length || !locations.length) {
      return []
    }

    const locationMap = new Map<string, GeoInfo>(
      locations.filter((l) => !!l?.zip_code).map((l) => [l.zip_code, l])
    )

    return dogs.map((d) => ({
      ...d,
      location: locationMap.get(d.zip_code) ?? null,
    }))
  }, [dogs, dogsLoading, locations, locationsLoading])

  return {
    dogs: dogsWithLocation,
    dogsLoading: searchLoading || dogsLoading || locationsLoading,
    searchResults,
  }
}
