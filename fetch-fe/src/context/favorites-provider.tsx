import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import { FavouritesContext } from './index'
import type { FavouriteDog } from '@/api/dog.types'
import { toast } from 'sonner'

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favourites, setFavourites] = useState<FavouriteDog[]>([])

  const toggleFavourites = useCallback((favourite: FavouriteDog) => {
    setFavourites((prev) => {
      const isFavourite = prev.some((dog) => dog.id === favourite.id)

      if (isFavourite) {
        toast.success(`Removed ${favourite.name} from favourites`)
        return prev.filter((dog) => dog.id !== favourite.id)
      } else {
        toast.success(`Added ${favourite.name} to favourites`)
        return [...prev, favourite]
      }
    })
  }, [])

  const resetFavourites = useCallback(() => {
    setFavourites([])
  }, [])

  const contextValue = useMemo(
    () => ({
      favourites,
      toggleFavourites,
      resetFavourites,
    }),
    [favourites, toggleFavourites, resetFavourites]
  )

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  )
}
