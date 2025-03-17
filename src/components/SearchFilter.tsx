import { useCallback } from 'react'
import { BreedSelect } from './BreedSelect'
import { AgeSlider } from './AgeSlider'
import type { DogSearchParams } from '@/api/dog.types'
import { Button } from './ui/button'
import { getDogBreeds } from '@/api/dog'
import { useQuery } from '@tanstack/react-query'
import { defaultFilters } from '@/hooks/useDogFilters'
import { debounce } from '@/lib/utils'
import { DELAY_MS } from '@/lib/constants'

type Props = {
  filters: Required<DogSearchParams>
  setFilters: (filters: Partial<DogSearchParams>) => void
  totalResults: number
}

export const SearchFilter = ({ totalResults, filters, setFilters }: Props) => {
  const { data: breeds = [] } = useQuery({
    queryKey: ['dogBreeds'],
    queryFn: getDogBreeds,
  })

  const range: [number, number] = [filters.ageMin, filters.ageMax]

  const toggleSelection = useCallback(
    (breedId: string) => {
      const updatedBreeds = filters.breeds.includes(breedId)
        ? filters.breeds.filter((id) => id !== breedId)
        : [...filters.breeds, breedId]

      setFilters({ breeds: updatedBreeds })
    },
    [filters, setFilters]
  )

  const debouncedSetFilters = debounce<number>((value: number) => {
    setFilters({ ageMax: value })
  }, DELAY_MS)

  const handleSliderChange = useCallback(
    (value: number) => {
      debouncedSetFilters(value)
    },
    [debouncedSetFilters]
  )

  const clearSelection = useCallback(() => {
    setFilters(defaultFilters)
  }, [setFilters])

  return (
    <div className="flex flex-col gap-6 p-4">
      <p className="text-xl font-bold text-purple-400">Search Filters </p>
      <span className="text-sm text-gray-500">
        {totalResults > 0 && `${totalResults} results found`}
      </span>
      <BreedSelect
        items={breeds}
        selectedItems={filters?.breeds ?? []}
        onToggleSelection={toggleSelection}
        onClearSelection={clearSelection}
      />
      <AgeSlider range={range} onSliderChange={handleSliderChange} />

      <Button
        className="cursor-pointer"
        variant="outline"
        onClick={clearSelection}
      >
        Reset Dog Filters
      </Button>
    </div>
  )
}
