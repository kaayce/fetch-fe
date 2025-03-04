import { useState } from 'react'
import { MAX_DOG_AGE, PAGE_LIMIT } from '@/lib/constants'
import type { DogSearchParams } from '@/api/dog.types'

export const defaultFilters: Required<DogSearchParams> = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: MAX_DOG_AGE,
  from: '0',
  size: PAGE_LIMIT,
  sort: 'breed:asc',
}

export const useDogFilters = () => {
  const [filters, setFilters] =
    useState<Required<DogSearchParams>>(defaultFilters)

  const resetFilters = () => setFilters(defaultFilters)

  return {
    filters,
    setFilters,
    resetFilters,
  }
}
