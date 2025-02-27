// response types
export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export type DogResponse = Omit<Dog, 'id'>

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}
export interface Coordinates {
  lat: number
  lon: number
}

// app types

export type User = {
  name: string
  email: string
}
