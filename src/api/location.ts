import { apiRequest } from '@/lib/request'
import type {
  GeoInfo,
  LocationSearchParams,
  LocationSearchResponse,
} from './location.types'
import { MAX_PAGE_LIMIT } from '@/lib/constants'

// locations
export const fetchLocationsByZipCodes = async (zipCodes: string[]) => {
  if (zipCodes.length > MAX_PAGE_LIMIT)
    throw new Error('Max: 100 locations per request')
  return apiRequest<GeoInfo[]>('LOCATIONS', {
    method: 'POST',
    body: JSON.stringify(zipCodes),
  })
}

// locations/search

export const searchLocations = async (params: LocationSearchParams) => {
  return apiRequest<LocationSearchResponse>('LOCATION_SEARCH', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
