import { MAX_DOG_AGE, PAGE_LIMIT } from '@/lib/constants'
import type { DogSearchParams, SortField } from '@/api/dog.types'
import { useSearchParams } from 'react-router'
import { useCallback } from 'react'

export const defaultFilters: Required<DogSearchParams> = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: MAX_DOG_AGE,
  from: '0',
  size: PAGE_LIMIT,
  sort: 'breed:asc',
}

const parseSearchParams = (
  searchParams: URLSearchParams
): Required<DogSearchParams> => ({
  breeds: searchParams.getAll('breeds'),
  zipCodes: searchParams.getAll('zipCodes'),
  ageMin: parseInt(searchParams.get('ageMin') ?? '0', 10),
  ageMax: parseInt(searchParams.get('ageMax') ?? MAX_DOG_AGE.toString(), 10),
  from: searchParams.get('from') ?? '0',
  size: parseInt(searchParams.get('size') ?? PAGE_LIMIT.toString(), 10),
  sort: (searchParams.get('sort') ?? 'breed:asc') as SortField,
})

const defaultParams = Object.fromEntries(
  Object.entries(defaultFilters).map(([key, value]) => [
    key,
    Array.isArray(value) ? value : value.toString(),
  ])
)
export const useDogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams(defaultParams)

  // converts defaultFilters to URLSearchParam object and sets to url
  const setDefaultFilters = useCallback(() => {
    setSearchParams(defaultParams)
  }, [setSearchParams])

  const filters = parseSearchParams(searchParams)

  const setFilters = (newFilters: Partial<DogSearchParams>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)

      if (newFilters.breeds) {
        newParams.delete('breeds')
        newFilters.breeds.forEach((breed) => newParams.append('breeds', breed))
      }
      if (newFilters.zipCodes) {
        newParams.delete('zipCodes')
        newFilters.zipCodes.forEach((zipCode) =>
          newParams.append('zipCodes', zipCode)
        )
      }
      if (newFilters.ageMin) {
        newParams.set('ageMin', newFilters.ageMin.toString())
      }
      if (newFilters.ageMax) {
        newParams.set('ageMax', newFilters.ageMax.toString())
      }
      if (newFilters.from) {
        newParams.set('from', newFilters.from.toString())
      }
      if (newFilters.size) {
        newParams.set('size', newFilters.size.toString())
      }
      if (newFilters.sort) {
        newParams.set('sort', newFilters.sort)
      }

      return newParams
    })
  }

  return {
    filters,
    setFilters,
    resetFilters: setDefaultFilters,
  }
}
