// useLocationFilters.ts
import { useState } from 'react'
import { LocationSearchParams } from '@/api/location.types'
import { PAGE_LIMIT } from '@/lib/constants'

export const defaultLocationFilters: LocationSearchParams = {
  size: PAGE_LIMIT,
  city: '',
  states: [],
  geoBoundingBox: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    bottom_left: {
      lat: 0,
      lon: 0,
    },
    top_left: {
      lat: 0,
      lon: 0,
    },
  },
}

export const useLocationFilters = () => {
  const [locationFilters, setLocationFilters] = useState<LocationSearchParams>(
    defaultLocationFilters
  )

  const resetLocationFilters = () => setLocationFilters(defaultLocationFilters)

  return {
    locationFilters,
    setLocationFilters,
    resetLocationFilters,
  }
}
