import type { SortField } from '@/api/dog.types'
import DogCard from '@/components/DogCard'
import { PagePagination } from '@/components/PagePagination'
import { SearchFilter } from '@/components/SearchFilter'
import { SortDropdown } from '@/components/SortDropdown'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useFavourites } from '@/hooks/useFavourite'
import { useDogs } from '@/hooks/useDogs'
import { PAGE_LIMIT } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { SelectDropdown } from '@/components/ui/SelectDropDown'
import { useDogFilters } from '@/hooks/useDogFilters'
import { Favourites } from '@/components/Favourites'
import { useMatch } from '@/hooks/useMatch'

const sortFields: Record<SortField, string> = {
  'breed:asc': 'Breed (A-Z)',
  'breed:desc': 'Breed (Z-A)',
  'name:asc': 'Name (A-Z)',
  'name:desc': 'Name (Z-A)',
  'age:asc': 'Age (Low to High)',
  'age:desc': 'Age (High to Low)',
} as const

const pageSizeOptions = ['20', '40', '60', '80', '100']

const SearchPage = () => {
  const { filters, setFilters } = useDogFilters()
  const { dogs, dogsLoading, searchResults } = useDogs(filters)
  const { toggleFavourites, favourites, resetFavourites } = useFavourites()
  const mutate = useMatch()

  const [currentPage, setCurrentPage] = useState(1)

  const handleSortChange = (sort: SortField) => {
    setFilters((prev) => ({ ...prev, sort }))
  }

  const handlePageSizeChange = (pageSize: string) => {
    setFilters((prev) => ({ ...prev, size: +pageSize }))
  }

  const handlePageChange = (type: 'next' | 'prev') => {
    const targetUrl = type === 'next' ? searchResults.next : searchResults.prev
    if (!targetUrl) return

    const newFrom = getFromValue(targetUrl)
    setFilters((prev) => ({ ...prev, from: newFrom }))
    setCurrentPage((curr) => (type === 'next' ? curr + 1 : curr - 1))
  }

  const match = () => {
    mutate.mutate()
  }

  return (
    <div className="container max-w-screen-lg flex flex-col h-full gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-1/5 mt-13 sticky h-[40em] top-0 space-y-4">
          <Favourites
            favourites={favourites}
            reset={resetFavourites}
            onMatch={match}
          />
          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            totalResults={searchResults.total}
          />
        </aside>

        <div className="flex-1 flex flex-col gap-4">
          {/* Mobile Filter and Sort */}
          <div className="lg:hidden flex justify-between items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Filter</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-4">
                <Favourites
                  favourites={favourites}
                  reset={resetFavourites}
                  onMatch={match}
                />
                <SearchFilter
                  filters={filters}
                  setFilters={setFilters}
                  totalResults={searchResults.total}
                />
              </SheetContent>
            </Sheet>
            <div className="flex gap-2">
              {/* PageSizeDropdown */}
              <SortDropdown
                onSortChange={handleSortChange}
                sortOptions={sortFields}
                selectedSort={filters.sort}
              />
              <SelectDropdown
                onChange={handlePageSizeChange}
                value={filters.size.toString()}
                options={pageSizeOptions}
                placeholder="Select Page Size..."
                className="w-[80px]"
              />
            </div>
          </div>

          {/* Sort Dropdown for Desktop */}
          <div className="hidden lg:flex self-end gap-2">
            {/* PageSizeDropdown */}
            <SortDropdown
              onSortChange={handleSortChange}
              sortOptions={sortFields}
              selectedSort={filters.sort}
            />
            <SelectDropdown
              onChange={handlePageSizeChange}
              value={filters.size.toString()}
              options={pageSizeOptions}
              placeholder="Select Page Size..."
              className="w-[80px]"
            />
          </div>

          {/* Dogs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-h-[600px]">
            {dogsLoading
              ? Array.from({ length: PAGE_LIMIT }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[200px] rounded-lg min-w-[200px]"
                  />
                ))
              : dogs.map((dog) => (
                  <DogCard
                    key={dog.id}
                    dog={dog}
                    isFavorite={favourites.some((f) => f.id === dog.id)}
                    onToggleFavorite={toggleFavourites}
                  />
                ))}
          </div>
        </div>
      </div>

      <PagePagination
        next={searchResults.next}
        prev={searchResults.prev}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        total={searchResults.total}
        pageSize={filters.size}
      />
    </div>
  )
}

const getFromValue = (url: string | null): string => {
  const urlParams = new URLSearchParams(url ?? '')
  return urlParams.get('from') ?? '0'
}
export default SearchPage
