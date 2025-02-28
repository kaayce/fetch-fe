export const BASE_URL = 'https://frontend-take-home-service.fetch.com'
export const APP_NAME = 'Pawradise'
export const REPO_URL = 'https://github.com/kaayce/fetch-FE'
export const PAGE_LIMIT = 20
export const HOUR = 60 * 60 * 1000

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
