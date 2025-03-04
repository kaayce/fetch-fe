import type { FavouriteDog } from '@/api/dog.types'
import type { User } from '@/types'
import { createContext } from 'react'

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  signIn: (user: User) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
})

export const FavouritesContext = createContext({
  favourites: [] as FavouriteDog[],
  toggleFavourites: (favourite: FavouriteDog) => {},
  resetFavourites: () => {},
})
