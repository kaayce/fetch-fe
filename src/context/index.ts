import type { FavouriteDog } from '@/api/dog.types'
import type { User } from '@/types'
import { createContext } from 'react'

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  signIn: (user: User) => void
  signOut: () => void
}

type FavouritesContextType = {
  favourites: FavouriteDog[]
  toggleFavourites: (favourite: FavouriteDog) => void
  resetFavourites: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
})

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [] as FavouriteDog[],
  toggleFavourites: () => {},
  resetFavourites: () => {},
})
