export const BASE_URL = 'https://frontend-take-home-service.fetch.com'
export const APP_NAME = 'Pawradise'
export const REPO_URL = 'https://github.com/kaayce/fetch-fe'
export const MAX_DOG_AGE = 30
export const PAGE_LIMIT = 20
export const MAX_PAGE_LIMIT = 100
export const HOUR = 60
// export const HOUR = 60 * 60 * 1000
export const DAY = 60 * 60 * 1000 * 24
export const DELAY_MS = 300

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  DOG_BREEDS: '/dogs/breeds',
  DOGS: '/dogs',
  DOG_MATCH: '/dogs/match',
  LOCATIONS: '/locations',
  LOCATION_SEARCH: '/locations/search',
  DOG_SEARCH: '/dogs/search',
} as const

export const PATHS = {
  LOGIN: '/login',
  HOME: '/',
  MATCH: '/match',
} as const
