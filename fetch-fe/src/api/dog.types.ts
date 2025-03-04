import type { GeoInfo } from './location.types'

export type Dog = {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export type FavouriteDog = Omit<Dog, 'age' | 'zip_code' | 'breed'>

// dogs/search
export type SortField = `${'breed' | 'name' | 'age'}:${'asc' | 'desc'}`
export type DogSearchParams = {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number

  // extras
  size?: number
  from?: string
  sort?: SortField
}

export type DogWithLocation = Dog & {
  location: GeoInfo | null
}

export type Match = {
  match: string
}

export type DogSearchResponse = {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}
