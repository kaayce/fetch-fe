import { matchDogsByIds } from '@/api/dog'
import { DAY, PATHS } from '@/lib/constants'
import sessionStorageInstance from '@/lib/storage'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useFavourites } from './useFavourite'
import type { FavouriteDog } from '@/api/dog.types'

export const useMatch = () => {
  const navigate = useNavigate()
  const { favourites, resetFavourites } = useFavourites()

  return useMutation({
    mutationFn: () => matchDogsByIds(favourites.map((fav) => fav.id)),
    onSuccess: (data) => {
      toast.info(`Matching...`)

      const matchedDog = favourites.find((f) => f.id === data.match)
      if (matchedDog) {
        sessionStorageInstance.setValue<FavouriteDog>('match', matchedDog, DAY)
        navigate(PATHS.MATCH)
      }
    },
    onSettled: resetFavourites,
  })
}
