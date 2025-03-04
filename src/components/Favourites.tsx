import { Button } from './ui/button'
import type { FavouriteDog } from '@/api/dog.types'

type Props = {
  favourites: FavouriteDog[]
  reset: () => void
  onMatch: () => void
}
export const Favourites = ({ favourites, reset, onMatch }: Props) => {
  if (!favourites.length) return null

  return (
    <div className="space-y-4 px-3 w-full">
      <p className="text-xl font-bold text-purple-400">Favourites </p>

      <ul className="flex flex-wrap gap-4 px-4">
        {favourites.map((dog) => (
          <li key={dog.id} className="flex gap-2 items-center">
            <img
              src={dog.img}
              alt={dog.name}
              className="h-5 w-5 rounded-full object-cover aspect-[6/4]"
            />

            <span className="text-xs text-gray-500">{dog.name}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Button variant="outline" onClick={reset} className="cursor-pointer">
          Clear
        </Button>
        <Button
          className="bg-purple-400 hover:bg-purple-500 text-white cursor-pointer"
          onClick={onMatch}
        >
          Match
        </Button>
      </div>
    </div>
  )
}
