export const BASE_URL = 'https://frontend-take-home-service.fetch.com' as const
export const APP_NAME = 'Pawradise' as const
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  DOG_BREEDS: '/dogs/breeds',
  DOGS: '/dogs',
  DOG_MATCH: '/dogs/match',
  LOCATIONS: '/locations',
  LOCATION_SEARCH: '/locations/search',
  SEARCH: '/dogs/search',
} as const
