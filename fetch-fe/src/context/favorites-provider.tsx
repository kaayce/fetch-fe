import { useCallback, useMemo, useState, type PropsWithChildren } from 'react'
import { FavouritesContext } from './index'
import type { FavouriteDog } from '@/api/dog.types'
import { toast } from 'sonner'

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favourites, setFavourites] = useState<FavouriteDog[]>([])

  const toggleFavourites = useCallback(
    (favourite: FavouriteDog) => {
      const isFavourite = favourites.some((dog) => dog.id === favourite.id)

      if (isFavourite) {
        setFavourites((prev) => prev.filter((dog) => dog.id !== favourite.id))
        toast.success(`Removed ${favourite.name} from favourites`)
      } else {
        setFavourites((prev) => [...prev, favourite])
        toast.success(`Added ${favourite.name} to favourites`)
      }
    },
    [favourites]
  )

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
