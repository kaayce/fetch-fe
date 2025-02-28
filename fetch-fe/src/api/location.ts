import { apiRequest } from '@/lib/request'
import type {
  GeoLocation,
  LocationSearchParams,
  LocationSearchResponse,
} from './location.types'

// locations
export const fetchLocationsByZipCodes = async (zipCodes: string[]) => {
  return apiRequest<GeoLocation[]>('DOG_SEARCH', {
    method: 'POST',
    body: JSON.stringify(zipCodes),
  })
}

// locations/search

export const searchLocations = async (params: LocationSearchParams) => {
  return apiRequest<LocationSearchResponse>('LOCATION_SEARCH', {
    method: 'GET',
    body: JSON.stringify(params),
  })
}
