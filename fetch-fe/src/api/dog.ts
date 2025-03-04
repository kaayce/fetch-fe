import { apiRequest } from '@/lib/request'
import type {
  Dog,
  DogSearchParams,
  DogSearchResponse,
  Match,
} from './dog.types'
import { MAX_PAGE_LIMIT, PAGE_LIMIT } from '@/lib/constants'

// "dogs/breeds"
export const getDogBreeds = async () => {
  return apiRequest<string[]>('DOG_BREEDS', { method: 'GET' })
}

// "dogs/search"
export const searchDogs = async (params: DogSearchParams) => {
  const queryParams = new URLSearchParams()

  if (params.breeds) {
    params.breeds.forEach((breed) => queryParams.append('breeds', breed))
  }
  if (params.zipCodes) {
    params.zipCodes.forEach((zip) => queryParams.append('zipCodes', zip))
  }
  if (params.ageMin) queryParams.append('ageMin', params.ageMin.toString())
  if (params.ageMax) queryParams.append('ageMax', params.ageMax.toString())
  if (params.size) {
    queryParams.append('size', params.size.toString() || PAGE_LIMIT.toString())
  }
  if (params.from) queryParams.append('from', params.from)
  if (params.sort) queryParams.append('sort', params.sort)

  return apiRequest<DogSearchResponse>(
    'DOG_SEARCH',
    {
      method: 'GET',
    },
    queryParams
  )
}

// "dogs"
export const fetchDogsByIds = async (dogIds: string[]) => {
  if (dogIds.length > MAX_PAGE_LIMIT)
    throw new Error('Max: 100 dogs per request')

  return apiRequest<Dog[]>('DOGS', {
    method: 'POST',
    body: JSON.stringify(dogIds),
  })
}

// "dogs/match"
export const matchDogsByIds = async (dogIds: string[]) => {
  return apiRequest<Match>('DOG_MATCH', {
    method: 'POST',
    body: JSON.stringify(dogIds),
  })
}
