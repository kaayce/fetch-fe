export type GeoLocation = {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}
export type Coordinates = {
  lat: number
  lon: number
}

// locations/search

export type LocationSearchParams = {
  city?: string
  states?: string[]
  geoBoundingBox?: {
    top?: number
    left?: number
    bottom?: number
    right?: number
    bottom_left?: Coordinates
    top_left?: Coordinates
  }
  size?: number
  from?: number
}

export type LocationSearchResponse = {
  results: GeoLocation[]
  total: number
}
